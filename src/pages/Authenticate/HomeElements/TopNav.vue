<template>
  <div class="top-nav">
    <v-btn icon variant="text" class="sidebar-toggle" @click="toggleSidebar">
      <v-icon size="28" color="#FFFFFF">mdi-menu</v-icon>
    </v-btn>
    <div class="nav-tabs">
      <span class="tab active">Overview</span>
      <span class="tab">Ladder</span>
      <span class="tab">Browse</span>
    </div>

    <div class="nav-controls">
      <div class="search-bar">
        <v-icon size="16" color="#8E9297">mdi-magnify</v-icon>
        <input type="text" placeholder="Search in Fortnite..." />
      </div>
      <div class="user-controls">
        <v-icon size="20" color="#FFFFFF">mdi-bell</v-icon>
        <span class="username-display">Erik Packmans</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  toggleSidebar: () => void;
}>();
</script>

<style scoped lang="scss">
/* Copy your existing top-nav styles here */
.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #1a1d23;
  border-bottom: 1px solid #2c3036;
}

.nav-tabs {
  display: flex;
  gap: 32px;
}
.sidebar-toggle {
  display: none;
}

.tab {
  font-size: 14px;
  font-weight: 10;
  color: #8e9297;
  cursor: pointer;
  padding: 8px 0;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.tab.active {
  color: #ffffff;
  border-bottom-color: #5865f2;
}

.tab:hover:not(.active) {
  color: #dcddde;
}

.nav-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #2c3036;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid transparent;
  transition: border-color 0.2s;
}

.search-bar:focus-within {
  border-color: #5865f2;
}

.search-bar input {
  background: none;
  border: none;
  color: #ffffff;
  font-size: 14px;
  outline: none;
  width: 200px;
}

.search-bar input::placeholder {
  color: #8e9297;
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

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .top-nav {
    position: fixed;
    flex-wrap: wrap;
    width: 100%;
    gap: 12px;
    padding: 12px 16px;
    z-index: 500;
  }
  .sidebar-toggle {
    display: inline-flex;
  }

  .nav-tabs {
    gap: 16px;
    flex: 1;
    justify-content: center;
  }

  .search-bar input {
    width: 120px;
  }
}

@media (max-width: 480px) {
  .nav-tabs {
    gap: 8px;
    font-size: 12px;
  }

  .search-bar input {
    display: none;
  }

  .username-display {
    display: none;
  }
}
</style>
