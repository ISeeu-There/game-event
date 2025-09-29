```vue
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
    <EnhancedBackground />

    <!-- Main Content -->
    <div class="main-content">
      <!-- Top Nav -->
      <TopNav :toggleSidebar="toggleSidebar" />

      <!-- Esports Container -->
      <v-container fluid class="esports-container">
        <HeroSection />
        <LiveMatches />
        <TabsContent />
      </v-container>
    </div>

    <!-- Live Stream Modal -->
    <v-dialog v-model="streamDialog" max-width="900px">
      <v-card class="glass-card">
        <v-toolbar color="red" dark>
          <v-toolbar-title>
            <v-icon class="mr-2">mdi-circle</v-icon>
            Live Stream
          </v-toolbar-title>
          <v-spacer />
          <v-btn icon @click="streamDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <div class="stream-container">
          <div class="stream-placeholder">
            <v-icon size="100" color="grey">mdi-video</v-icon>
            <h3>Live Stream Player</h3>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SideBarHeader from "../HomeElements/SideBarHeader.vue";
import NavMenuSideBar from "../HomeElements/NavMenuSideBar.vue";
import TopNav from "../HomeElements/TopNav.vue";
import EnhancedBackground from "../EsportsElements/EnhancedBackground.vue";
import HeroSection from "../EsportsElements/HeroSection.vue";
import LiveMatches from "../EsportsElements/LiveMatches.vue";
import TabsContent from "../EsportsElements/TabsContent.vue";

// Sidebar toggle
const isSidebarOpen = ref(false);
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

// Stream modal
const streamDialog = ref(false);
</script>

<style scoped>
/* Base Layout */
.gaming-platform {
  display: flex;
  min-height: 100vh;
  background: #0a0a0f;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  color: #ffffff;
  overflow-x: hidden;
}

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

.main-content {
  flex: 1;
  margin-left: 240px;
  background: transparent;
  position: relative;
  z-index: 2;
}

.esports-container {
  padding: 0;
  max-width: 1600px;
  margin: 0 auto;
}

/* Glass Card Effect */
.glass-card {
  background: rgba(26, 29, 35, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
}

/* Stream Modal */
.stream-container {
  height: 400px;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
}

.stream-placeholder {
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
}

/* Responsive */
@media (max-width: 992px) {
  .main-content {
    display: flex;
    flex-direction: column;
    width: 250px;
    margin-left: 0;
  }

  .sidebar {
    transform: translateX(-100%);
  }

  .sidebar.active {
    transform: translateX(0);
  }
}

@media (max-width: 600px) {
  .stream-container {
    height: 250px;
  }
}

/* Vuetify overrides */
.v-card {
  background-color: transparent !important;
}

.v-dialog > .v-overlay__content > .v-card {
  background-color: rgba(26, 29, 35, 0.95) !important;
}

.v-navigation-drawer {
  background-color: rgba(26, 29, 35, 0.95) !important;
}
</style>
```
