<template>
  <v-app>
    <!-- Enhanced Animated Background -->
    <div class="animated-bg">
      <div class="gradient-overlay"></div>
      <div class="blob blob1"></div>
      <div class="blob blob2"></div>
      <div class="blob blob3"></div>
      <div class="blob blob4"></div>
      <div class="floating-particles">
        <div
          v-for="n in 15"
          :key="n"
          :style="getParticleStyle(n)"
          class="particle"
        ></div>
      </div>
      <div class="grid-pattern"></div>
    </div>

    <v-container
      fluid
      class="d-flex align-center justify-center fill-height position-relative"
    >
      <v-row class="w-100" align="center" justify="center">
        <!-- Sidebar -->
        <v-col
          cols="12"
          md="6"
          class="d-none d-md-flex flex-column align-center justify-center text-white px-8"
        >
          <div class="welcome-content">
            <div class="icon-container mb-6">
              <v-icon size="80" color="white" class="welcome-icon"
                >mdi-shield-check</v-icon
              >
            </div>
            <h1 class="text-h2 font-weight-bold mb-6 welcome-title">
              Verify Your Email
            </h1>
            <p class="text-h6 text-center mb-8 welcome-subtitle">
              We've sent a verification code to protect your account
            </p>
            <div class="features-list">
              <div
                class="feature-item"
                v-for="feature in features"
                :key="feature.icon"
              >
                <v-icon class="feature-icon" color="rgba(255,255,255,0.9)">
                  {{ feature.icon }}
                </v-icon>
                <span class="feature-text">{{ feature.text }}</span>
              </div>
            </div>
          </div>
        </v-col>

        <!-- OTP Card -->
        <v-col cols="12" md="4" lg="3">
          <v-card class="glass-card pa-8 position-relative">
            <div class="card-glow"></div>

            <div class="text-center mb-8">
              <div class="logo-container mb-4">
                <v-icon size="48" color="white" class="logo-pulse"
                  >mdi-email-check</v-icon
                >
              </div>
              <h2 class="text-h4 font-weight-bold text-white">
                Enter OTP Code
              </h2>
              <p class="text-body-2 text-white-70 mt-2">
                We sent a code to
                <span class="email-highlight">{{ email }}</span>
              </p>
            </div>

            <v-form class="otp-form" @submit.prevent="verifyOtp">
              <!-- OTP Inputs -->
              <div class="otp-inputs mb-6">
                <input
                  v-for="(digit, index) in otpDigits"
                  :key="index"
                  :ref="(el) => setOtpInputRef(el as HTMLInputElement, index)"
                  v-model="otpDigits[index]"
                  type="text"
                  maxlength="1"
                  class="otp-input"
                  @input="handleInput(index, $event as InputEvent)"
                  @keydown="handleKeyDown(index, $event as KeyboardEvent)"
                  @paste="handlePaste"
                />
              </div>

              <!-- Timer -->
              <div class="text-center mb-6">
                <div v-if="timer > 0" class="timer-text">
                  <v-icon size="16" color="rgba(255,255,255,0.7)"
                    >mdi-clock-outline</v-icon
                  >
                  Resend code in {{ formattedTimer }}
                </div>
                <div v-else>
                  <a href="#" class="resend-link" @click.prevent="resendCode">
                    Didn't receive the code? Resend
                  </a>
                </div>
              </div>

              <!-- Buttons -->
              <v-btn
                block
                size="large"
                class="primary-btn mb-4"
                elevation="0"
                :disabled="!isOtpComplete || isLoading"
                @click="verifyOtp"
              >
                <v-progress-circular
                  v-if="isLoading"
                  indeterminate
                  size="20"
                  color="white"
                  class="mr-2"
                />
                <v-icon v-else left class="mr-2">mdi-check-circle</v-icon>
                {{ isLoading ? "Verifying..." : "Verify Email" }}
              </v-btn>
              <v-btn
                block
                size="large"
                class="secondary-btn"
                elevation="0"
                @click="changeEmail"
              >
                <v-icon left class="mr-2">mdi-email-edit</v-icon>
                Change Email
              </v-btn>
            </v-form>

            <!-- Success -->
            <v-alert
              v-if="showSuccess"
              type="success"
              variant="tonal"
              class="mt-4 success-alert"
            >
              <div class="d-flex align-items-center">
                <v-icon class="mr-2">mdi-check-circle</v-icon>
                Email verified successfully!
              </div>
            </v-alert>

            <!-- Error -->
            <v-alert
              v-if="showError"
              type="error"
              variant="tonal"
              class="mt-4 error-alert"
            >
              <div class="d-flex align-items-center">
                <v-icon class="mr-2">mdi-alert-circle</v-icon>
                Invalid code. Please try again.
              </div>
            </v-alert>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { db } from "../../../plugines/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";

const router = useRouter();
const route = useRoute();
const email = ref(route.query.email || "");

const otpDigits = ref(["", "", "", "", "", ""]);
const isLoading = ref(false);
const showSuccess = ref(false);
const showError = ref(false);

const timer = ref(60);
let intervalId: number;

const isOtpComplete = computed(() => otpDigits.value.every((d) => d !== ""));
const formattedTimer = computed(() => {
  const min = Math.floor(timer.value / 60);
  const sec = timer.value % 60;
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
});

const otpInputRefs = ref<HTMLInputElement[]>([]);
const setOtpInputRef = (el: HTMLInputElement, index: number) => {
  otpInputRefs.value[index] = el;
};

const handleInput = (index: number, event: InputEvent) => {
  const value = (event.target as HTMLInputElement).value;
  otpDigits.value[index] = value;
  if (value && index < otpDigits.value.length - 1) {
    otpInputRefs.value[index + 1].focus();
  }
};

const handleKeyDown = (index: number, event: KeyboardEvent) => {
  if (event.key === "Backspace" && !otpDigits.value[index] && index > 0) {
    otpInputRefs.value[index - 1].focus();
  }
};

const handlePaste = (event: ClipboardEvent) => {
  const pasteData = event.clipboardData?.getData("text") ?? "";
  pasteData.split("").forEach((char, i) => {
    if (i < otpDigits.value.length) otpDigits.value[i] = char;
  });
  event.preventDefault();
};

onMounted(() => {
  startTimer();
});

function startTimer() {
  clearInterval(intervalId);
  timer.value = 60;
  intervalId = setInterval(() => {
    if (timer.value > 0) timer.value--;
    else clearInterval(intervalId);
  }, 1000);
}

function getParticleStyle(n: number) {
  return {
    left: Math.random() * 100 + "%",
    top: Math.random() * 100 + "%",
    animationDelay: Math.random() * 20 + "s",
    animationDuration: 10 + Math.random() * 20 + "s",
  };
}

async function verifyOtp() {
  const otpCode = otpDigits.value.join("");
  if (otpCode.length < 6) return;

  isLoading.value = true;
  showError.value = false;
  showSuccess.value = false;

  try {
    const otpQuery = query(
      collection(db, "otps"),
      where("email", "==", email.value)
    );
    const otpSnap = await getDocs(otpQuery);

    if (otpSnap.empty) {
      showError.value = true;
      isLoading.value = false;
      return;
    }

    let valid = false;
    otpSnap.forEach((docSnap) => {
      if (docSnap.data().otp === otpCode) valid = true;
    });

    if (!valid) {
      showError.value = true;
      isLoading.value = false;
      return;
    }

    // Update user as verified
    const usersQuery = query(
      collection(db, "users"),
      where("email", "==", email.value)
    );
    const usersSnap = await getDocs(usersQuery);
    usersSnap.forEach(async (userDoc) => {
      await updateDoc(doc(db, "users", userDoc.id), {
        verified: true,
        verifiedAt: serverTimestamp(),
      });
    });

    // Delete OTP
    otpSnap.forEach(async (docSnap) => {
      await deleteDoc(doc(db, "otps", docSnap.id));
    });

    showSuccess.value = true;
    setTimeout(() => router.push({ name: "home" }), 1000);
  } catch (error: any) {
    console.error(error.message);
    showError.value = true;
  } finally {
    isLoading.value = false;
  }
}

async function resendCode() {
  startTimer();
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await addDoc(collection(db, "otps"), {
      email: email.value,
      otp,
      createdAt: serverTimestamp(),
    });

    // Send email using Firebase mail extension
    await addDoc(collection(db, "mail"), {
      to: email.value,
      message: {
        subject: "Your OTP Code",
        text: `Your OTP code is: ${otp}`,
        html: `<p>Your OTP code is: <strong>${otp}</strong></p><p>It will expire in 5 minutes.</p>`,
      },
    });
  } catch (error: any) {
    console.error(error.message);
  }
}

function changeEmail() {
  router.push({ name: "register" });
}

const features = [
  { icon: "mdi-shield-check", text: "Secure OTP verification" },
  { icon: "mdi-timer-sand", text: "Expires in 5 minutes" },
  { icon: "mdi-email-outline", text: "Email delivery" },
];
</script>

<style scoped>
/* Enhanced Background Animations */
@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg) scale(1);
  }
  25% {
    transform: translateY(-30px) rotate(5deg) scale(1.05);
  }
  50% {
    transform: translateY(-20px) rotate(-3deg) scale(0.95);
  }
  75% {
    transform: translateY(-40px) rotate(8deg) scale(1.1);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.1);
  }
}

@keyframes particleFloat {
  0%,
  100% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) translateX(50px);
    opacity: 0;
  }
}

@keyframes logoGlow {
  0%,
  100% {
    text-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
  }
  50% {
    text-shadow: 0 0 30px rgba(139, 92, 246, 0.8),
      0 0 40px rgba(168, 85, 247, 0.3);
  }
}

@keyframes cardGlow {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.05);
  }
}

@keyframes inputPulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4);
  }
  50% {
    box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);
  }
}

/* Background Setup */
.animated-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  background: linear-gradient(
    135deg,
    #0f0c29 0%,
    #302b63 25%,
    #24243e 50%,
    #1a1a2e 75%,
    #16213e 100%
  );
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    ellipse at center,
    rgba(139, 92, 246, 0.1) 0%,
    transparent 70%
  );
  z-index: 1;
}

.grid-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.03) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  z-index: 1;
}

/* Enhanced Blobs */
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  animation: float 15s ease-in-out infinite;
  z-index: 1;
}

.blob1 {
  width: 400px;
  height: 400px;
  background: linear-gradient(
    45deg,
    rgba(139, 92, 246, 0.7),
    rgba(168, 85, 247, 0.5)
  );
  top: 10%;
  left: 15%;
  animation-delay: 0s;
}

.blob2 {
  width: 500px;
  height: 500px;
  background: linear-gradient(
    135deg,
    rgba(168, 85, 247, 0.6),
    rgba(192, 132, 252, 0.4)
  );
  bottom: 10%;
  right: 10%;
  animation-delay: 3s;
}

.blob3 {
  width: 350px;
  height: 350px;
  background: linear-gradient(
    225deg,
    rgba(99, 102, 241, 0.5),
    rgba(139, 92, 246, 0.4)
  );
  top: 50%;
  right: 25%;
  animation-delay: 6s;
}

.blob4 {
  width: 300px;
  height: 300px;
  background: linear-gradient(
    315deg,
    rgba(167, 139, 250, 0.4),
    rgba(196, 181, 253, 0.3)
  );
  top: 25%;
  left: 50%;
  animation-delay: 9s;
}

/* Floating Particles */
.floating-particles {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  animation: particleFloat linear infinite;
}

/* Welcome Content Styling */
.welcome-content {
  max-width: 500px;
  z-index: 3;
  position: relative;
}

.icon-container {
  animation: pulse 3s ease-in-out infinite;
}

.welcome-icon {
  animation: logoGlow 4s ease-in-out infinite;
}

.welcome-title {
  background: linear-gradient(135deg, #ffffff, #e9d5ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.welcome-subtitle {
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
}

.feature-icon {
  font-size: 20px !important;
}

.feature-text {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

/* Enhanced Glass Card */
.glass-card {
  background: rgba(255, 255, 255, 0.08) !important;
  backdrop-filter: blur(25px) saturate(180%);
  -webkit-backdrop-filter: blur(25px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  border-radius: 24px !important;
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 3;
  position: relative;
}

.glass-card::before {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(
    45deg,
    rgba(139, 92, 246, 0.3),
    rgba(168, 85, 247, 0.3),
    rgba(192, 132, 252, 0.3),
    rgba(167, 139, 250, 0.3)
  );
  border-radius: 26px;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.glass-card:hover::before {
  opacity: 1;
}

.glass-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 35px 60px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.card-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(139, 92, 246, 0.1) 0%,
    transparent 70%
  );
  animation: cardGlow 6s ease-in-out infinite;
  z-index: -1;
}

.logo-pulse {
  animation: pulse 2s ease-in-out infinite;
}

/* Email Highlight */
.email-highlight {
  color: #a78bfa;
  font-weight: 600;
}

/* OTP Input Styling */
.otp-inputs {
  display: flex;
  gap: 5px;
  justify-content: center;
}

.otp-input {
  width: 40px;
  height: 46px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  color: white;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  transition: all 0.3s ease;
  outline: none;
}

.otp-input:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.25);
}

.otp-input:focus {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(139, 92, 246, 0.8);
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
  animation: inputPulse 1.5s ease-in-out infinite;
}

/* Timer and Links */
.timer-text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.resend-link {
  color: #a78bfa;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
}

.resend-link:hover {
  color: #c4b5fd;
  text-shadow: 0 0 8px rgba(167, 139, 250, 0.5);
}

/* Enhanced Buttons */
.primary-btn {
  background: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%) !important;
  color: white !important;
  border-radius: 16px !important;
  font-weight: 600 !important;
  text-transform: none !important;
  height: 48px !important;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease !important;
}

.primary-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.primary-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.6s ease;
}

.primary-btn:hover:not(:disabled)::before {
  left: 100%;
}

.primary-btn:hover:not(:disabled) {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4) !important;
}

.secondary-btn {
  background: rgba(255, 255, 255, 0.05) !important;
  color: white !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  border-radius: 16px !important;
  font-weight: 600 !important;
  text-transform: none !important;
  height: 48px !important;
  transition: all 0.3s ease !important;
}

.secondary-btn:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  border-color: rgba(255, 255, 255, 0.25) !important;
  transform: translateY(-2px) !important;
}

/* Alert Styling */
.success-alert {
  background: rgba(34, 197, 94, 0.15) !important;
  border: 1px solid rgba(34, 197, 94, 0.3) !important;
  border-radius: 12px !important;
  color: #86efac !important;
}

.error-alert {
  background: rgba(239, 68, 68, 0.15) !important;
  border: 1px solid rgba(239, 68, 68, 0.3) !important;
  border-radius: 12px !important;
  color: #fca5a5 !important;
}

/* Utility Classes */
.text-white-70 {
  color: rgba(255, 255, 255, 0.7) !important;
}

/* Responsive Design */
@media (max-width: 960px) {
  .glass-card {
    margin: 20px;
  }

  .blob1,
  .blob2,
  .blob3,
  .blob4 {
    width: 250px;
    height: 250px;
  }

  .otp-input {
    width: 45px;
    height: 50px;
    font-size: 20px;
  }

  .otp-inputs {
    gap: 8px;
  }
}

@media (max-width: 600px) {
  .otp-input {
    width: 40px;
    height: 48px;
    font-size: 18px;
  }

  .otp-inputs {
    gap: 6px;
  }
}
</style>
