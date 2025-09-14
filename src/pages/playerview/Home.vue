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
    <!-- Background Section -->
    <div class="fixed-bg-video">
      <video autoplay muted loop playsinline class="bg-video">
        <source src="../../assets/bg.mp4" type="video/mp4" />
      </video>
      <div class="video-overlay"></div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <!--Top Nav-->
      <TopNav :toggleSidebar="toggleSidebar" />
      <!-- Game Header -->
      <GameHeader />

      <!-- Featured Tournaments -->
      <featuredTournament />
      <!-- Upcoming -->

      <UpcomingEvents />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SideBarHeader from "../HomeElements/SideBarHeader.vue";
import NavMenuSideBar from "../HomeElements/NavMenuSideBar.vue";
import UpcomingEvents from "../HomeElements/upcomingEvents.vue";
import GameHeader from "../HomeElements/GameHeader.vue";
import FeaturedTournament from "../HomeElements/FeaturedTournament.vue";
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
  transition: 0.1;
}
.sidebar-toggle {
  display: none;
}

/* Main Content Styles */
.main-content {
  flex: 1;
  margin-left: 240px;
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1d23 100%);
}

.user-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.username-display {
  font-size: 14px;
  font-weight: 10;
  color: #ffffff;
}
/* Fixed Background Video */
.fixed-bg-video {
  position: fixed;
  top: 0;
  left: 100px;
  width: 100%;
  height: 100vh;
  z-index: 0;
  overflow: hidden;
}

.bg-video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
  transform: translate(-50%, -50%);
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3); /* Optional: add dark overlay */
  z-index: 1;
}

.main-content {
  flex: 1;
  margin-left: 240px;
  background: transparent;
  position: relative;
  z-index: 2;
}

/* Responsive Design */
@media (max-width: 768px) {
  .sidebar {
    width: 200px;
    transform: translateX(-100%);
  }
  .sidebar.active {
    transform: translateX(0);
  }
  .sidebar-toggle {
    display: inline-flex;
  }

  .main-content {
    margin-left: 200px;
  }
}

@media (max-width: 480px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s;
  }

  .main-content {
    margin-left: 0;
  }

  .character-showcase img {
    width: 200px;
    height: 300px;
  }
}
/* Mobile Responsiveness */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: -240px;
    width: 220px;
    height: 100vh;
    transition: left 0.3s ease;
    z-index: 1000;
  }

  .sidebar.active {
    left: 0;
  }

  .main-content {
    margin-left: 0;
  }
  .fixed-bg-video {
    position: fixed;
    top: 0;
    left: -2px;
    width: 100%;
    height: 100vh;
    z-index: 0;
    overflow: hidden;
  }
  .bg-video {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 50%;
    min-height: 50%;
    object-fit: cover;
  }
}
</style>
