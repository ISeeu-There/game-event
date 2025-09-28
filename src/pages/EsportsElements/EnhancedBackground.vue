<template>
  <!-- Enhanced Background -->
  <div class="enhanced-bg">
    <div class="bg-particles"></div>
    <div class="bg-glow-1"></div>
    <div class="bg-glow-2"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
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

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
