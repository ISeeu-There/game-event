<template>
  <div class="gaming-platform">
    <!-- Sidebar -->
    <div class="sidebar" :class="{ active: isSidebarOpen }">
      <SideBarHeader />
      <NavMenuSideBar />
    </div>
    <transition name="fade">
      <div v-if="isSidebarOpen" class="overlay" @click="toggleSidebar"></div>
    </transition>

    <!-- Enhanced Background -->
    <div class="enhanced-bg">
      <div class="bg-particles"></div>
      <div class="bg-glow-1"></div>
      <div class="bg-glow-2"></div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <!--Top Nav-->
      <TopNav :toggleSidebar="toggleSidebar" />

      <!-- Membership Content -->
      <v-container fluid class="membership-container">
        <!-- Hero Section -->
        <div class="hero-section">
          <div class="hero-content">
            <div class="hero-badge">
              <v-icon class="mr-2">mdi-crown</v-icon>
              PREMIUM MEMBERSHIP
            </div>
            <h1 class="hero-title">
              Elevate Your <span class="gradient-text">Gaming Experience</span>
            </h1>
            <p class="hero-subtitle">
              Join thousands of elite gamers with exclusive tournaments,
              advanced features, and premium rewards
            </p>
            <div class="hero-stats">
              <div class="stat-item">
                <div class="stat-number">50K+</div>
                <div class="stat-label">Active Members</div>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <div class="stat-number">$2M+</div>
                <div class="stat-label">Prize Pool</div>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <div class="stat-number">24/7</div>
                <div class="stat-label">Support</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Current Membership Status -->
        <v-row class="mb-8">
          <v-col cols="12">
            <v-card class="membership-status-card glass-card" elevation="0">
              <div class="status-header">
                <div class="status-icon-wrapper">
                  <v-icon size="32" color="primary">mdi-account-star</v-icon>
                </div>
                <div class="status-info">
                  <h3 class="status-title">
                    {{ currentMembership.type }} Member
                  </h3>
                  <p class="status-subtitle">{{ currentMembership.status }}</p>
                </div>
                <v-chip
                  :color="
                    currentMembership.type === 'Premium'
                      ? 'success'
                      : 'grey-darken-2'
                  "
                  variant="elevated"
                  size="large"
                  class="status-chip"
                >
                  <v-icon start size="16">{{
                    currentMembership.type === "Premium"
                      ? "mdi-check-circle"
                      : "mdi-account"
                  }}</v-icon>
                  {{ currentMembership.type }}
                </v-chip>
              </div>

              <div
                v-if="currentMembership.type === 'Premium'"
                class="membership-progress"
              >
                <div class="progress-info">
                  <span class="progress-label">Membership Progress</span>
                  <span class="progress-days"
                    >{{ daysRemaining }} days remaining</span
                  >
                </div>
                <v-progress-linear
                  :model-value="membershipProgress"
                  color="primary"
                  height="10"
                  rounded
                  class="mt-3"
                  bg-color="grey-darken-3"
                ></v-progress-linear>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <!-- Membership Plans -->
        <div class="plans-section">
          <div class="section-header">
            <h2 class="section-title">Choose Your Gaming Tier</h2>
            <p class="section-subtitle">
              Unlock your potential with the perfect plan for your gaming
              journey
            </p>
          </div>

          <v-row class="plans-grid">
            <v-col
              v-for="(plan, index) in membershipPlans"
              :key="plan.id"
              cols="12"
              md="4"
            >
              <div
                class="plan-card-wrapper"
                :class="{ 'recommended-wrapper': plan.recommended }"
              >
                <v-card
                  class="membership-plan-card glass-card"
                  :class="{
                    recommended: plan.recommended,
                    'plan-animate': true,
                  }"
                  elevation="0"
                  height="100%"
                  :style="{ animationDelay: `${index * 0.2}s` }"
                >
                  <div v-if="plan.recommended" class="recommended-badge">
                    <div class="badge-glow"></div>
                    <v-chip
                      color="primary"
                      size="small"
                      variant="elevated"
                      class="mt-5"
                    >
                      <v-icon start size="16">mdi-star</v-icon>
                      Most Popular
                    </v-chip>
                  </div>

                  <div class="plan-header">
                    <div
                      class="plan-icon-wrapper"
                      :style="{ backgroundColor: `${plan.color}20` }"
                    >
                      <v-icon :color="plan.color" size="48">{{
                        plan.icon
                      }}</v-icon>
                    </div>
                    <h3 class="plan-name">{{ plan.name }}</h3>
                    <div class="price-section">
                      <div class="price-main">
                        <span class="currency">$</span>
                        <span class="price">{{ plan.price }}</span>
                      </div>
                      <span class="period">/{{ plan.period }}</span>
                      <div v-if="plan.savings" class="savings">
                        Save {{ plan.savings }}
                      </div>
                    </div>
                  </div>

                  <v-card-text class="plan-features">
                    <v-list class="feature-list" lines="one">
                      <v-list-item
                        v-for="feature in plan.features"
                        :key="feature"
                        class="feature-item"
                      >
                        <template v-slot:prepend>
                          <div class="feature-check">
                            <v-icon color="success" size="18"
                              >mdi-check-circle</v-icon
                            >
                          </div>
                        </template>
                        <v-list-item-title class="feature-text">
                          {{ feature }}
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-card-text>

                  <v-card-actions class="plan-actions">
                    <v-btn
                      :color="plan.recommended ? 'primary' : 'grey-darken-3'"
                      :variant="plan.recommended ? 'elevated' : 'outlined'"
                      block
                      size="large"
                      class="plan-button"
                      @click="selectPlan(plan)"
                      :disabled="
                        currentMembership.type === 'Premium' &&
                        plan.name === 'Premium'
                      "
                    >
                      <v-icon v-if="getButtonIcon(plan)" start>{{
                        getButtonIcon(plan)
                      }}</v-icon>
                      {{ getButtonText(plan) }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </div>
            </v-col>
          </v-row>
        </div>

        <!-- Premium Benefits -->
        <div class="benefits-section">
          <div class="section-header">
            <h2 class="section-title">Premium Gaming Benefits</h2>
            <p class="section-subtitle">
              Everything you need to dominate the competition
            </p>
          </div>

          <v-row class="benefits-grid">
            <v-col
              v-for="(benefit, index) in premiumBenefits"
              :key="benefit.title"
              cols="12"
              sm="6"
              lg="3"
            >
              <v-card
                class="benefit-card glass-card benefit-animate"
                elevation="0"
                :style="{ animationDelay: `${index * 0.1}s` }"
              >
                <v-card-text class="benefit-content">
                  <div
                    class="benefit-icon-wrapper"
                    :style="{ backgroundColor: `${benefit.color}20` }"
                  >
                    <v-icon :color="benefit.color" size="40">{{
                      benefit.icon
                    }}</v-icon>
                  </div>
                  <h4 class="benefit-title">{{ benefit.title }}</h4>
                  <p class="benefit-description">{{ benefit.description }}</p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <!-- Enhanced Footer Section -->
        <v-row class="footer-section">
          <v-col cols="12" md="8">
            <v-card class="payment-card glass-card" elevation="0">
              <v-card-text>
                <div class="payment-header">
                  <v-icon class="text-white" size="28">mdi-shield-check</v-icon>
                  <div>
                    <h3 class="text-white">Secure Payment Methods</h3>
                    <p class="text-white">
                      Your payment information is protected with
                      enterprise-grade security
                    </p>
                  </div>
                </div>
                <div class="payment-methods">
                  <div
                    v-for="method in paymentMethods"
                    :key="method"
                    class="payment-method-item"
                  >
                    <v-icon :color="getPaymentColor(method)" size="24">{{
                      getPaymentIcon(method)
                    }}</v-icon>
                    <span>{{ method }}</span>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card class="support-card glass-card" elevation="0">
              <v-card-text class="support-content">
                <div class="support-icon-wrapper">
                  <v-icon color="primary" size="32">mdi-headset</v-icon>
                </div>
                <h3 class="support-title">24/7 Gaming Support</h3>
                <p class="support-description">
                  Get help from our expert gaming support team anytime
                </p>
                <v-btn
                  color="primary"
                  variant="outlined"
                  block
                  size="large"
                  class="support-button"
                >
                  <v-icon start>mdi-message-text</v-icon>
                  Contact Support
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- Enhanced Plan Selection Dialog -->
    <v-dialog v-model="planDialog" max-width="600" persistent>
      <v-card class="dialog-card glass-card" elevation="0">
        <div class="dialog-header">
          <div class="dialog-icon-wrapper">
            <v-icon color="primary" size="32">{{ selectedPlan?.icon }}</v-icon>
          </div>
          <div>
            <v-card-title class="dialog-title"
              >Upgrade to {{ selectedPlan?.name }}</v-card-title
            >
            <p class="dialog-subtitle">
              You're about to unlock premium gaming features
            </p>
          </div>
        </div>

        <v-card-text class="dialog-content">
          <div class="upgrade-summary">
            <div class="summary-item">
              <span class="summary-label">Plan:</span>
              <span class="summary-value">{{ selectedPlan?.name }}</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">Price:</span>
              <span class="summary-value"
                >${{ selectedPlan?.price }}/{{ selectedPlan?.period }}</span
              >
            </div>
            <div class="summary-item">
              <span class="summary-label">Billing:</span>
              <span class="summary-value">{{
                selectedPlan?.period === "year" ? "Annual" : "Monthly"
              }}</span>
            </div>
          </div>

          <div class="upgrade-features">
            <h4 class="features-title">What you'll get:</h4>
            <div class="features-preview">
              <div
                v-for="feature in selectedPlan?.features.slice(0, 4)"
                :key="feature"
                class="feature-preview-item"
              >
                <v-icon color="success" size="16">mdi-check-circle</v-icon>
                <span>{{ feature }}</span>
              </div>
              <div
                v-if="
                  selectedPlan?.features && selectedPlan.features.length > 4
                "
                class="feature-more"
              >
                +{{ selectedPlan.features.length - 4 }} more features
              </div>
            </div>
          </div>
        </v-card-text>

        <v-card-actions class="dialog-actions">
          <v-btn variant="text" size="large" @click="planDialog = false">
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            variant="elevated"
            size="large"
            class="upgrade-button"
            @click="proceedToPayment"
          >
            <v-icon start>mdi-credit-card</v-icon>
            Proceed to Payment
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import SideBarHeader from "../HomeElements/SideBarHeader.vue";
import NavMenuSideBar from "../HomeElements/NavMenuSideBar.vue";
import TopNav from "../HomeElements/TopNav.vue";

interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  icon: string;
  color: string;
  recommended?: boolean;
  savings?: string;
}

interface Benefit {
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface CurrentMembership {
  type: string;
  status: string;
  expiryDate?: Date;
}

const isSidebarOpen = ref(false);
const planDialog = ref(false);
const selectedPlan = ref<MembershipPlan | null>(null);

const currentMembership = ref<CurrentMembership>({
  type: "Free",
  status: "Active since March 2024",
});

const membershipPlans = ref<MembershipPlan[]>([
  {
    id: "free",
    name: "Free Player",
    price: 0,
    period: "month",
    icon: "mdi-account",
    color: "#78909c",
    features: [
      "Access to public tournaments",
      "Basic game statistics",
      "Community forums access",
      "Standard matchmaking",
      "Basic profile customization",
    ],
  },
  {
    id: "premium",
    name: "Pro Gamer",
    price: 19.99,
    period: "month",
    icon: "mdi-crown",
    color: "#2196f3",
    recommended: true,
    features: [
      "All tournament access",
      "Priority matchmaking queue",
      "Advanced statistics & analytics",
      "Custom game modes",
      "Premium profile themes",
      "Exclusive weekly tournaments",
      "Ad-free experience",
      "Discord VIP access",
    ],
  },
  {
    id: "elite",
    name: "Elite Champion",
    price: 199.99,
    period: "year",
    icon: "mdi-diamond-stone",
    color: "#9c27b0",
    savings: "17%",
    features: [
      "Everything in Pro Gamer",
      "VIP tournament privileges",
      "Personal gaming coach sessions",
      "Custom avatar & banner design",
      "Monthly exclusive cosmetics",
      "Beta features early access",
      "Priority customer support",
      "Exclusive community events",
      "2 months absolutely free",
    ],
  },
]);

const premiumBenefits = ref<Benefit[]>([
  {
    title: "Exclusive Tournaments",
    description:
      "Access premium tournaments with prize pools up to $50,000 and exclusive rewards",
    icon: "mdi-trophy-award",
    color: "#ffc107",
  },
  {
    title: "Lightning Fast Matchmaking",
    description:
      "Skip the queue with priority matchmaking and play with skilled opponents instantly",
    icon: "mdi-flash",
    color: "#03a9f4",
  },
  {
    title: "Advanced Analytics",
    description:
      "Detailed performance insights, heatmaps, and personalized improvement recommendations",
    icon: "mdi-chart-line",
    color: "#4caf50",
  },
  {
    title: "Elite Support",
    description:
      "Get immediate help from our expert gaming support team available 24/7",
    icon: "mdi-headset",
    color: "#e91e63",
  },
]);

const paymentMethods = ref([
  "Credit Card",
  "PayPal",
  "Google Pay",
  "Apple Pay",
  "Crypto",
]);

const membershipProgress = computed(() => {
  if (currentMembership.value.type !== "Premium") return 0;
  return 75;
});

const daysRemaining = computed(() => {
  if (currentMembership.value.type !== "Premium") return 0;
  return 23;
});

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}

function selectPlan(plan: MembershipPlan) {
  if (currentMembership.value.type === "Premium" && plan.name === "Pro Gamer")
    return;

  selectedPlan.value = plan;
  planDialog.value = true;
}

function getButtonText(plan: MembershipPlan): string {
  if (currentMembership.value.type === "Premium" && plan.name === "Pro Gamer") {
    return "Current Plan";
  }
  if (plan.name === "Free Player") {
    return "Current Plan";
  }
  return `Choose ${plan.name.split(" ")[0]}`;
}

function getButtonIcon(plan: MembershipPlan): string {
  if (currentMembership.value.type === "Premium" && plan.name === "Pro Gamer") {
    return "mdi-check";
  }
  if (plan.name === "Free Player") {
    return "mdi-account";
  }
  return "mdi-arrow-right";
}

function proceedToPayment() {
  console.log("Proceeding to payment for:", selectedPlan.value);
  planDialog.value = false;
}

function getPaymentIcon(method: string): string {
  const iconMap: Record<string, string> = {
    "Credit Card": "mdi-credit-card",
    PayPal: "mdi-paypal",
    "Google Pay": "mdi-google-pay",
    "Apple Pay": "mdi-apple",
    Crypto: "mdi-bitcoin",
  };
  return iconMap[method] || "mdi-credit-card";
}

function getPaymentColor(method: string): string {
  const colorMap: Record<string, string> = {
    "Credit Card": "#1976d2",
    PayPal: "#003087",
    "Google Pay": "#4285f4",
    "Apple Pay": "#000000",
    Crypto: "#f7931a",
  };
  return colorMap[method] || "#1976d2";
}
</script>

<style scoped>
.gaming-platform {
  display: flex;
  width: 100%;
  min-height: 100vh;
  background: #0a0a0f;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  color: #ffffff;
}

/* Sidebar Styles */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  height: 100vh;
  background: #1a1d23;
  z-index: 1000;
  transition: transform 0.3s ease;
}

.sidebar.active {
  transform: translateX(0);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 900;
  transition: opacity 0.3s ease;
}

/* Enhanced Background */
.enhanced-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: radial-gradient(
    ellipse at top,
    #1a1d23 0%,
    #0a0a0f 50%,
    #000000 100%
  );
  z-index: 0;
  overflow: hidden;
}

.bg-particles {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(
      2px 2px at 20px 30px,
      rgba(255, 255, 255, 0.1),
      transparent
    ),
    radial-gradient(2px 2px at 40px 70px, rgba(33, 150, 243, 0.1), transparent),
    radial-gradient(1px 1px at 90px 40px, rgba(255, 255, 255, 0.1), transparent),
    radial-gradient(1px 1px at 130px 80px, rgba(156, 39, 176, 0.1), transparent);
  background-repeat: repeat;
  background-size: 200px 100px;
  animation: float 20s linear infinite;
}

.bg-glow-1 {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(33, 150, 243, 0.1) 0%,
    transparent 50%
  );
  animation: rotate 30s linear infinite;
}

.bg-glow-2 {
  position: absolute;
  bottom: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(156, 39, 176, 0.1) 0%,
    transparent 50%
  );
  animation: rotate 40s linear infinite reverse;
}

/* Main Content */
.main-content {
  flex: 1;
  margin-left: 240px;
  background: transparent;
  position: relative;
  z-index: 2;
}

.membership-container {
  padding: 0;
  max-width: 1400px;
  margin: 0 auto;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(
    135deg,
    rgba(33, 150, 243, 0.1) 0%,
    rgba(156, 39, 176, 0.1) 100%
  );
  padding: 4rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)" /></svg>')
    repeat;
  opacity: 0.3;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  background: rgba(33, 150, 243, 0.2);
  border: 1px solid rgba(33, 150, 243, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #2196f3;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.gradient-text {
  background: linear-gradient(135deg, #2196f3, #e91e63, #9c27b0);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.6;
}

.hero-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #2196f3, #9c27b0);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stat-label {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
}

/* Glass Card Effect */
.glass-card {
  background: rgba(26, 29, 35, 0.7) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 16px !important;
}

/* Status Card */
.membership-status-card {
  padding: 2rem;
}

.status-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.status-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: rgba(33, 150, 243, 0.2);
  border-radius: 16px;
  border: 1px solid rgba(33, 150, 243, 0.3);
}

.status-info {
  flex: 1;
}

.status-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.status-subtitle {
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.status-chip {
  height: 40px !important;
}

.membership-progress {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.progress-label {
  font-weight: 600;
}

.progress-days {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
}

/* Sections */
.plans-section,
.benefits-section {
  padding: 4rem 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ffffff, #b0bec5);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.section-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  max-width: 500px;
  margin: 0 auto;
}

/* Plan Cards */
.plans-grid {
  display: flex;
}

.plan-card-wrapper {
  position: relative;
  height: 900px;
}

.recommended-wrapper::before {
  content: "";
  display: flex;

  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(135deg, #2196f3, #9c27b0);
  border-radius: 18px;
  z-index: -1;
}

.membership-plan-card {
  padding: 2rem;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.membership-plan-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.05),
    transparent
  );
  transition: left 0.6s ease;
}

.membership-plan-card:hover::before {
  left: 100%;
}

.membership-plan-card:hover {
  transform: translateY(-8px);
  border-color: rgba(33, 150, 243, 0.5);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.recommended-badge {
  position: absolute;
  top: -12px;
  right: 20px;
  z-index: 1;
}

.badge-glow {
  position: absolute;
  top: -5px;
  left: -5px;
}
.badge-glow {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border-radius: 12px;
  background: radial-gradient(circle, rgba(33, 150, 243, 0.3), transparent 70%);
  filter: blur(12px);
  z-index: -1;
  animation: pulse 3s infinite;
}

/* Plan Header */
.plan-header {
  text-align: center;
  margin-bottom: 2rem;
}

.plan-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 20px;
  margin: 0 auto 1rem;
}

.plan-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.price-section {
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 0.25rem;
  font-weight: 700;
}

.price-main {
  font-size: 2.5rem;
}

.currency {
  font-size: 1.2rem;
  opacity: 0.7;
}

.period {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
}

.savings {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #4caf50;
  font-weight: 600;
}

/* Plan Features */
.plan-features {
  margin: 2rem 0;
}

.feature-list {
  padding: 0;
}

.feature-item {
  padding: 0.5rem 0;
}

.feature-text {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
}

/* Plan Actions */
.plan-actions {
  margin-top: auto;
}

.plan-button {
  font-weight: 600;
  border-radius: 12px;
}

/* Benefits Section */
.benefit-card {
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s ease;
}

.benefit-card:hover {
  transform: translateY(-6px);
}

.benefit-icon-wrapper {
  width: 70px;
  height: 70px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.benefit-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.benefit-description {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
}

/* Footer Section */
.footer-section {
  display: flex;
  justify-content: center;
  padding: 4rem 2rem;
  width: 100%;

  gap: 2rem;
}

.payment-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.payment-methods {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;

  gap: 1rem;
}

.payment-method-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-weight: 100;
}

.support-content {
  text-align: center;
  color: white;
  font-weight: 100;
}

.support-icon-wrapper {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: rgba(33, 150, 243, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

/* Dialog */
.dialog-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 2rem 2rem 1rem;
}

.dialog-title {
  font-weight: 700;
  font-size: 1.5rem;
}

.dialog-subtitle {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
}

.upgrade-summary {
  margin-bottom: 1.5rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.summary-label {
  font-weight: 600;
}

.summary-value {
  color: rgba(255, 255, 255, 0.9);
}

.upgrade-features .features-title {
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.features-preview {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.feature-preview-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.feature-more {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

.dialog-actions {
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.upgrade-button {
  font-weight: 600;
  border-radius: 12px;
}

/* Animations */
@keyframes float {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 200px 100px;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}

/* ========================
   RESPONSIVE ADJUSTMENTS
   ======================== */

/* Tablets and below */
@media (max-width: 960px) {
  /* Sidebar turns into overlay */
  .hero-section {
    margin-top: 20px;
  }
  .gaming-platform {
    min-height: 100vh;
    min-width: 100vw;
    overflow-x: hidden;
  }

  .main-content {
    margin-left: 0;
    width: 100%;
  }

  .sidebar {
    transform: translateX(-100%);
  }
  .sidebar.active {
    transform: translateX(0);
  }

  /* Hero */
  .hero-title {
    font-size: clamp(2rem, 6vw, 3rem);
  }

  .hero-subtitle {
    font-size: clamp(1rem, 3vw, 1.2rem);
  }

  .hero-stats {
    flex-direction: column;
    gap: 1rem;
  }

  /* Plans */
  .plan-grid {
    grid-template-columns: 1fr; /* stack vertically */
    gap: 1.5rem;
  }

  .plan-card {
    padding: 1.5rem;
  }

  .price-main {
    font-size: 2rem;
  }
}

/* Small phones */
@media (max-width: 600px) {
  .gaming-platform {
    min-height: 100vh;
    min-width: 100vw;
    overflow-x: hidden;
  }
  .hero-title {
    font-size: clamp(1.8rem, 7vw, 2.5rem);
  }

  .hero-subtitle {
    font-size: 0.9rem;
  }

  .badge {
    font-size: 0.7rem;
    padding: 0.25rem 0.6rem;
  }

  .benefit-card {
    padding: 1.2rem;
  }

  .benefit-icon-wrapper {
    width: 55px;
    height: 55px;
  }

  .footer-section {
    padding: 2rem 1rem;
    gap: 1.5rem;
  }

  .dialog-header {
    flex-direction: column;
    text-align: center;
  }

  .dialog-title {
    font-size: 1.2rem;
  }

  .dialog-subtitle {
    font-size: 0.85rem;
  }

  .dialog-actions {
    flex-direction: column;
    gap: 0.75rem;
  }

  .plan-button,
  .upgrade-button {
    width: 100%;
  }
}
</style>
