<template>
  <div class="sidebar-header">
    <div class="user-profile">
      <div class="avatar-wrapper">
        <v-avatar size="40" class="user-avatar">
          <v-img alt="User" />
        </v-avatar>
        <div class="online-dot"></div>
      </div>
      <div class="user-info">
        <h3 class="username">Epic Packmans</h3>
        <p class="user-status">Online</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.sidebar-header {
  padding: 16px;
  border-bottom: 1px solid #2c3036;
}
.sidebar-toggle {
  display: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar-wrapper {
  position: relative;
}

.user-avatar {
  border: 2px solid #5865f2;
}

.online-dot {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  background: #23a55a;
  border: 2px solid #1a1d23;
  border-radius: 50%;
  z-index: 10;
}

.user-info .username {
  font-size: 14px;
  font-weight: 10;
  color: #ffffff;
  margin: 0;
}

.user-status {
  font-size: 12px;
  color: #8e9297;
  margin: 0;
}
</style>
