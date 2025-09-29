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
          class="particle"
          v-for="n in 15"
          :key="n"
          :style="getParticleStyle(n)"
        ></div>
      </div>
      <div class="grid-pattern"></div>
    </div>

    <v-container
      fluid
      class="d-flex align-center justify-center fill-height position-relative"
    >
      <v-row class="w-100" align="center" justify="center">
        <!-- Enhanced Sidebar -->
        <v-col
          cols="12"
          md="6"
          class="d-none d-md-flex flex-column align-center justify-center text-white px-8"
        >
          <div class="welcome-content">
            <div class="icon-container mb-6">
              <v-icon size="80" color="white" class="welcome-icon"
                >mdi-account-circle</v-icon
              >
            </div>
            <h1 class="text-h2 font-weight-bold mb-6 welcome-title">
              Welcome Back
            </h1>
            <p class="text-h6 text-center mb-8 welcome-subtitle">
              Sign in to access your dashboard and continue where you left off
            </p>
            <div class="features-list">
              <div
                class="feature-item"
                v-for="feature in features"
                :key="feature.icon"
              >
                <v-icon class="feature-icon" color="rgba(255,255,255,0.9)">{{
                  feature.icon
                }}</v-icon>
                <span class="feature-text">{{ feature.text }}</span>
              </div>
            </div>
          </div>
        </v-col>

        <!-- Enhanced Login Card -->
        <v-col cols="12" md="4" lg="3">
          <v-card class="glass-card pa-8 position-relative">
            <div class="card-glow"></div>
            <div class="text-center mb-8">
              <div class="logo-container mb-4">
                <v-icon size="48" color="white" class="logo-pulse"
                  >mdi-login</v-icon
                >
              </div>
              <h2 class="text-h4 font-weight-bold text-white">Sign In</h2>
              <p class="text-body-2 text-white-70 mt-2">
                Enter your credentials to continue
              </p>
            </div>

            <v-form class="login-form">
              <div class="form-group">
                <v-text-field
                  label="Email Address"
                  type="email"
                  prepend-inner-icon="mdi-email"
                  variant="outlined"
                  density="comfortable"
                  class="custom-input mb-4"
                  color="white"
                />
              </div>

              <div class="form-group">
                <v-text-field
                  label="Password"
                  type="password"
                  prepend-inner-icon="mdi-lock"
                  variant="outlined"
                  density="comfortable"
                  class="custom-input mb-2"
                  color="white"
                />
              </div>

              <div class="d-flex justify-end mb-6">
                <a href="#" class="forgot-password-link"> Forgot password? </a>
              </div>

              <v-btn block size="large" class="primary-btn mb-4" elevation="0">
                <v-icon left class="mr-5">mdi-login</v-icon>
                Sign In
              </v-btn>
            </v-form>

            <div class="text-center">
              <p class="text-white-70">
                Don't have an account?
                <router-link to="/register" class="register-link">
                  Create one here
                </router-link>
              </p>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref } from "vue";

const features = ref([
  { icon: "mdi-speedometer", text: "Fast & Reliable" },
  { icon: "mdi-shield-lock", text: "Secure Access" },
  { icon: "mdi-devices", text: "Multi-Device Sync" },
]);

const getParticleStyle = (n) => {
  return {
    left: Math.random() * 100 + "%",
    top: Math.random() * 100 + "%",
    animationDelay: Math.random() * 20 + "s",
    animationDuration: 10 + Math.random() * 20 + "s",
  };
};
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
    text-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
  }
  50% {
    text-shadow: 0 0 30px rgba(99, 102, 241, 0.8),
      0 0 40px rgba(34, 197, 94, 0.3);
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
    rgba(34, 197, 94, 0.1) 0%,
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
    rgba(34, 197, 94, 0.7),
    rgba(59, 130, 246, 0.5)
  );
  top: 15%;
  left: 10%;
  animation-delay: 0s;
}

.blob2 {
  width: 500px;
  height: 500px;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.6),
    rgba(139, 92, 246, 0.4)
  );
  bottom: 10%;
  right: 15%;
  animation-delay: 3s;
}

.blob3 {
  width: 350px;
  height: 350px;
  background: linear-gradient(
    225deg,
    rgba(236, 72, 153, 0.5),
    rgba(251, 113, 133, 0.4)
  );
  top: 45%;
  right: 20%;
  animation-delay: 6s;
}

.blob4 {
  width: 300px;
  height: 300px;
  background: linear-gradient(
    315deg,
    rgba(14, 165, 233, 0.4),
    rgba(34, 197, 94, 0.3)
  );
  top: 30%;
  left: 60%;
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
  background: linear-gradient(135deg, #ffffff, #dcfce7);
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
  height: 100%;
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
    rgba(34, 197, 94, 0.3),
    rgba(99, 102, 241, 0.3),
    rgba(236, 72, 153, 0.3),
    rgba(14, 165, 233, 0.3)
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
    rgba(34, 197, 94, 0.1) 0%,
    transparent 70%
  );
  animation: cardGlow 6s ease-in-out infinite;
  z-index: -1;
}

.logo-pulse {
  animation: pulse 2s ease-in-out infinite;
}

/* Form Styling */
.custom-input :deep(.v-field) {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  border-radius: 16px !important;
}

.custom-input :deep(.v-field:hover) {
  background: rgba(255, 255, 255, 0.08) !important;
  border-color: rgba(255, 255, 255, 0.25) !important;
}

.custom-input :deep(.v-field--focused) {
  background: rgba(255, 255, 255, 0.1) !important;
  border-color: rgba(34, 197, 94, 0.6) !important;
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2) !important;
}

.custom-input :deep(input) {
  color: white !important;
}

.custom-input :deep(.v-label) {
  color: rgba(255, 255, 255, 0.7) !important;
}

.custom-input :deep(.v-icon) {
  color: rgba(255, 255, 255, 0.6) !important;
}

/* Enhanced Buttons */
.primary-btn {
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%) !important;
  color: white !important;
  border-radius: 16px !important;
  font-weight: 600 !important;
  text-transform: none !important;
  height: 48px !important;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease !important;
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

.primary-btn:hover::before {
  left: 100%;
}

.primary-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 25px rgba(34, 197, 94, 0.4) !important;
}

.google-btn {
  background: rgba(255, 255, 255, 0.1) !important;
  color: white !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  border-radius: 16px !important;
  font-weight: 600 !important;
  text-transform: none !important;
  height: 48px !important;
  transition: all 0.3s ease !important;
}

.google-btn:hover {
  background: rgba(255, 255, 255, 0.15) !important;
  border-color: rgba(255, 255, 255, 0.3) !important;
  transform: translateY(-2px) !important;
}

/* Divider */
.divider {
  position: relative;
  text-align: center;
  margin: 24px 0;
}

.divider::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
}

.divider-text {
  background: rgba(255, 255, 255, 0.08);
  padding: 8px 16px;
  border-radius: 20px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  position: relative;
  z-index: 1;
}

/* Links */
.forgot-password-link {
  color: rgba(255, 255, 255, 0.7) !important;
  text-decoration: none !important;
  font-size: 14px !important;
  transition: all 0.3s ease !important;
}

.forgot-password-link:hover {
  color: #22c55e !important;
  text-shadow: 0 0 8px rgba(34, 197, 94, 0.3);
}

.register-link {
  color: #22c55e !important;
  text-decoration: none !important;
  font-weight: 600 !important;
  transition: all 0.3s ease !important;
}

.register-link:hover {
  color: #16a34a !important;
  text-shadow: 0 0 8px rgba(34, 197, 94, 0.5);
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
}
</style>
