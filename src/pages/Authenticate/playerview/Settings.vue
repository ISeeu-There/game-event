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
    <v-main class="dark"
      ><!-- Main Content -->
      <div class="main-content">
        <!--Top Nav-->
        <div class="menu-btn">
          <v-btn
            variant="text"
            class="sidebar-toggle ma-2"
            @click="toggleSidebar"
          >
            <v-icon>mdi-menu </v-icon>
            <p class="ml-10">Settings</p>
          </v-btn>
        </div>

        <v-divider class="mx-4 mb-2" />
        <!-- Account Settings -->
        <div class="px-4 py-2 mt-15">
          <div
            class="text-caption text-grey text-uppercase font-weight-bold mb-2"
          >
            Account
          </div>
        </div>
        <v-list color="transparent" class="py-0">
          <v-list-item
            v-for="item in accountSettings"
            :key="item.title"
            :prepend-icon="item.icon"
            :title="item.title"
            :subtitle="item.subtitle"
            @click="navigateToSetting(item.route)"
            class="px-4"
          >
            <template v-slot:append>
              <v-icon color="grey" size="20"> mdi-chevron-right </v-icon>
            </template>
          </v-list-item>
        </v-list>
        <v-divider class="mx-4 my-4" />

        <!-- Privacy & Security -->
        <div class="px-4 py-2">
          <div
            class="text-caption text-grey text-uppercase font-weight-bold mb-2"
          >
            Privacy & Security
          </div>
        </div>
        <v-divider class="mx-4 my-4" />
        <v-list color="transparent" class="py-0">
          <v-list-item
            v-for="item in privacySettings"
            :key="item.title"
            :prepend-icon="item.icon"
            :title="item.title"
            :subtitle="item.subtitle"
            @click="navigateToSetting(item.route)"
            class="px-4"
          >
            <template v-slot:append>
              <v-switch
                v-if="item.toggle"
                v-model="toggleStates[item.key as keyof ToggleStates]"
                color="primary"
                hide-details
                inset
                @click.stop
              />
              <v-icon v-else color="grey" size="20"> mdi-chevron-right </v-icon>
            </template>
          </v-list-item>
        </v-list>

        <v-divider class="mx-4 my-4" />
        <!-- Notifications -->
        <div class="px-4 py-2">
          <div
            class="text-caption text-grey text-uppercase font-weight-bold mb-2"
          >
            Notifications
          </div>
        </div>

        <v-list color="transparent" class="py-0">
          <v-list-item
            v-for="item in notificationSettings"
            :key="item.title"
            :prepend-icon="item.icon"
            :title="item.title"
            :subtitle="item.subtitle"
            @click="navigateToSetting(item.route)"
            class="px-4"
          >
            <template v-slot:append>
              <v-switch
                v-if="item.toggle"
                v-model="toggleStates[item.key as keyof ToggleStates]"
                color="primary"
                hide-details
                inset
                @click.stop
              />
              <v-icon v-else color="grey" size="20"> mdi-chevron-right </v-icon>
            </template>
          </v-list-item>
        </v-list>

        <v-divider class="mx-4 my-4" />
        <!-- Support & Help -->
        <div class="px-4 py-2">
          <div
            class="text-caption text-grey text-uppercase font-weight-bold mb-2"
          >
            Support & Help
          </div>
        </div>

        <v-list color="transparent" class="py-0">
          <v-list-item
            v-for="item in supportSettings"
            :key="item.title"
            :prepend-icon="item.icon"
            :title="item.title"
            :subtitle="item.subtitle"
            @click="navigateToSetting(item.route)"
            class="px-4"
          >
            <template v-slot:append>
              <v-icon color="grey" size="20"> mdi-chevron-right </v-icon>
            </template>
          </v-list-item>
        </v-list>

        <v-divider class="mx-4 my-4" />
        <div class="px-4 py-2">
          <v-btn
            color="red"
            variant="text"
            block
            class="mx-4 mb-4"
            @click="logout"
            prepend-icon="mdi-logout"
          >
            Log Out
          </v-btn>
        </div>
      </div></v-main
    >
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import NavMenuSideBar from "../HomeElements/NavMenuSideBar.vue";

// Types
interface UserProfile {
  name: string;
  username: string;
  avatar: string;
}

interface SettingItem {
  title: string;
  subtitle?: string;
  icon: string;
  route: string;
  toggle?: boolean;
  key?: string;
}

interface ToggleStates {
  privateAccount: boolean;
  activityStatus: boolean;
  readReceipts: boolean;
  pushNotifications: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
}

// Data
const userProfile: UserProfile = {
  name: "John Doe",
  username: "johndoe",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
};

const logoutDialog = ref(false);

const toggleStates = reactive<ToggleStates>({
  privateAccount: false,
  activityStatus: true,
  readReceipts: true,
  pushNotifications: true,
  emailNotifications: false,
  smsNotifications: false,
});

const accountSettings: SettingItem[] = [
  {
    title: "Edit Profile",
    subtitle: "Name, bio, website, etc.",
    icon: "mdi-account-edit",
    route: "/edit-profile",
  },
  {
    title: "Professional Dashboard",
    subtitle: "Tools for creators and businesses",
    icon: "mdi-chart-line",
    route: "/professional-dashboard",
  },
  {
    title: "QR Code",
    subtitle: "Share your profile",
    icon: "mdi-qrcode",
    route: "/qr-code",
  },
  {
    title: "Saved",
    subtitle: "Posts, collections, and guides",
    icon: "mdi-bookmark",
    route: "/saved",
  },
  {
    title: "Close Friends",
    subtitle: "Share with a smaller audience",
    icon: "mdi-star-circle",
    route: "/close-friends",
  },
  {
    title: "Language",
    subtitle: "English (US)",
    icon: "mdi-translate",
    route: "/language",
  },
];

const privacySettings: SettingItem[] = [
  {
    title: "Account Privacy",
    subtitle: "Private account",
    icon: "mdi-lock",
    route: "/privacy",
    toggle: true,
    key: "privateAccount",
  },
  {
    title: "Activity Status",
    subtitle: "Show when you're active",
    icon: "mdi-clock-outline",
    route: "/activity-status",
    toggle: true,
    key: "activityStatus",
  },
  {
    title: "Read Receipts",
    subtitle: "Allow others to see when you've read their messages",
    icon: "mdi-check-all",
    route: "/read-receipts",
    toggle: true,
    key: "readReceipts",
  },
  {
    title: "Blocked Accounts",
    subtitle: "Manage blocked users",
    icon: "mdi-block-helper",
    route: "/blocked",
  },
  {
    title: "Two-Factor Authentication",
    subtitle: "Add extra security to your account",
    icon: "mdi-security",
    route: "/two-factor",
  },
];

const notificationSettings: SettingItem[] = [
  {
    title: "Push Notifications",
    subtitle: "Posts, stories and comments",
    icon: "mdi-bell",
    route: "/notifications",
    toggle: true,
    key: "pushNotifications",
  },
  {
    title: "Email Notifications",
    subtitle: "Get updates via email",
    icon: "mdi-email",
    route: "/email-notifications",
    toggle: true,
    key: "emailNotifications",
  },
  {
    title: "SMS Notifications",
    subtitle: "Get updates via text",
    icon: "mdi-message-text",
    route: "/sms-notifications",
    toggle: true,
    key: "smsNotifications",
  },
];

const supportSettings: SettingItem[] = [
  {
    title: "Help",
    subtitle: "Help center and contact info",
    icon: "mdi-help-circle",
    route: "/help",
  },
  {
    title: "Privacy Policy",
    subtitle: "Learn about our privacy practices",
    icon: "mdi-shield-account",
    route: "/privacy-policy",
  },
  {
    title: "Terms of Service",
    subtitle: "Review our terms",
    icon: "mdi-file-document",
    route: "/terms",
  },
  {
    title: "About",
    subtitle: "App info and version",
    icon: "mdi-information",
    route: "/about",
  },
];

// Methods
const goBack = () => {
  console.log("Navigating back");
  // In a real app, use router.go(-1) or router.push('/')
};

const navigateToProfile = () => {
  console.log("Navigating to profile");
  // In a real app, use router.push('/profile')
};

const navigateToSetting = (route: string) => {
  console.log(`Navigating to: ${route}`);
  // In a real app, use router.push(route)
};

const logout = () => {
  logoutDialog.value = true;
};

const confirmLogout = () => {
  logoutDialog.value = false;
  console.log("User logged out");
  // In a real app, clear auth tokens and redirect to login
};
import { defineProps } from "vue";
import SideBarHeader from "../HomeElements/SideBarHeader.vue";
import TopNav from "../HomeElements/TopNav.vue";

const isSidebarOpen = ref(false);
function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}
</script>
<style scoped>
.gaming-platform {
  display: flex;
  min-height: 100vh;
  background: #0f0f0f;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  color: #ffffff;
}

/* Desktop Styles (default) */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  height: 100vh;
  background: #1a1d23;
  z-index: 1000;
  transition: transform 0.3s ease;
  transform: translateZ(0);
}

.sidebar.active {
  transform: translateX(0);
}

.sidebar-header {
  padding: 16px;
  border-bottom: 1px solid #2c3036;
}

.sidebar-toggle {
  display: none;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 900;
}
.main-content {
  flex: 1;
  background: transparent;
  position: relative;
  z-index: 2;
}

.menu-btn {
  position: fixed;
  width: 100%;
  background-color: #0f0f0f;
  margin-top: -10px;
  margin-left: -10px;
  z-index: 800;
  transform: translateZ(0);
  display: none;
}

.v-main {
  margin-left: 240px;
}

.v-container {
  max-width: 600px !important;
  margin: 0 auto;
}
.v-list-item::after {
  display: none !important;
}

.v-list-item {
  background-color: #0f0f0f;
  color: #ffffff;
  border-bottom: none !important;
  box-shadow: none !important;
}

.v-list-item:hover {
  background-color: #1a1d23;
  color: #ffffff;
}

.v-switch {
  flex: none;
}

/* Tablet Styles */
@media (max-width: 1024px) {
  .v-main {
    margin-left: 0;
  }

  .v-container {
    max-width: 500px !important;
  }
  .main-content {
    margin-left: 0;
  }

  .menu-btn {
    display: block;
  }

  .sidebar {
    left: -240px;
    transition: left 0.3s ease;
  }

  .sidebar.active {
    left: 0;
    transform: none;
  }

  .sidebar-toggle {
    display: inline-flex;
  }
}

/* Mobile Styles */
@media (max-width: 768px) {
  .v-container {
    max-width: 400px !important;
    padding: 0 16px;
  }

  .menu-btn {
    display: fixed;
    top: 15px;
    left: 15px;
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: -240px;
    width: 240px;
    height: 100vh;
    transition: left 0.3s ease;
    z-index: 1000;
    transform: translateZ(0);
  }

  .sidebar.active {
    left: 0;
    transform: none;
  }

  .sidebar-toggle {
    display: inline-flex;
  }

  .v-main {
    margin-left: 0;
  }

  .v-card {
    margin-top: 70px !important;
  }

  .v-list-item::after {
    display: none !important;
  }

  .v-list-item {
    background-color: #0f0f0f;
    color: #ffffff;
    border-bottom: none !important;
    box-shadow: none !important;
  }

  .v-list-item:hover {
    background-color: #1a1d23;
    color: #ffffff;
  }

  .text-h6 {
    font-size: 1.1rem !important;
  }

  .text-body-2 {
    font-size: 0.875rem !important;
  }
}

/* Small Mobile Styles */
@media (max-width: 480px) {
  .v-container {
    max-width: 100% !important;
    padding: 0 12px;
  }

  .menu-btn {
    top: 12px;
    left: 12px;
  }

  .sidebar {
    width: 280px;
    left: -280px;
  }

  .sidebar.active {
    left: 0;
  }

  .v-card {
    padding: 16px 12px !important;
    margin-top: 60px !important;
  }

  .v-avatar {
    width: 50px !important;
    height: 50px !important;
  }

  .text-h6 {
    font-size: 1rem !important;
  }

  .text-body-2 {
    font-size: 0.8rem !important;
  }

  .v-list-item {
    padding: 10px 12px;
    color: white;
    background-color: #0f0f0f;
    min-height: 56px;
  }
  .v-list-item:hover {
    background-color: rgba(255, 255, 255, 0.05);
    color: #0f0f0f;
  }

  .v-btn {
    font-size: 0.875rem !important;
  }

  .text-caption {
    font-size: 0.75rem !important;
  }
}

/* Extra Small Mobile */
@media (max-width: 360px) {
  .v-container {
    padding: 0 8px;
  }

  .menu-btn {
    top: 10px;
    left: 10px;
  }

  .v-card {
    padding: 12px 8px !important;
  }

  .sidebar {
    width: 260px;
    left: -260px;
  }

  .v-list-item::after {
    display: none !important;
  }

  .v-list-item {
    background-color: #0f0f0f;
    color: #ffffff;
    border-bottom: none !important;
    box-shadow: none !important;
  }

  .v-list-item:hover {
    background-color: #1a1d23;
    color: #ffffff;
  }
  .text-h6 {
    font-size: 0.95rem !important;
  }
}
</style>
