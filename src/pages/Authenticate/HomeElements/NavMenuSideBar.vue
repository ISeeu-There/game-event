<template>
  <div>
    <nav class="sidebar-nav">
      <div
        v-for="section in menuItems"
        :key="section.section"
        class="nav-section"
      >
        <div v-if="section.section !== 'MAIN'" class="section-title">
          {{ section.section }}
        </div>

        <router-link
          v-for="item in section.items"
          :key="item.id"
          :to="item.to"
          class="nav-item"
          active-class="active"
          exact-active-class="active"
          style="text-decoration: none"
        >
          <v-icon size="20" color="#8E9297">{{ item.icon }}</v-icon>
          <span>{{ item.title }}</span>
          <div v-if="item.badge" class="nav-badge">{{ item.badge }}</div>
        </router-link>
      </div>
      <div class="sidebar-bottom">
        <v-btn class="premium-btn" size="small" color="#00D4AA" variant="flat">
          <v-icon color="red">mdi-logout</v-icon>
          <span class="text-red ml-2"> Log Out</span>
        </v-btn>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { menuItems, type NavSection } from "../../../components/navItems";
</script>

<style scoped lang="scss">
.sidebar-nav {
  flex: 1;
  padding: 16px 0;
}

.nav-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 11px;
  font-weight: 10;
  color: #8e9297;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
  padding: 0 16px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  margin: 2px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
  color: #8e9297;
}

.nav-item.active {
  background: #5865f2;
  color: #ffffff;
}

.nav-item:hover:not(.active) {
  background: #35393f;
  color: #dcddde;
}

.nav-badge {
  margin-left: auto;
  background: #5865f2;
  color: #ffffff;
  font-size: 11px;
  font-weight: 10;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
}

.sidebar-bottom {
  padding: 16px;
  border-top: 1px solid #2c3036;
}

.premium-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-weight: 10;
  text-transform: none;
  letter-spacing: 0;
}
</style>
