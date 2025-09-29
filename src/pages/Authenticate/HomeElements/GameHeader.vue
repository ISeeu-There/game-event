<template>
  <div class="game-header">
    <div class="game-info">
      <div class="game-logo"></div>
      <div class="game-details">
        <h1 class="game-title">ALL Tournaments States</h1>
        <p class="game-description">
          Join millions in the ultimate battle for victory
        </p>

        <!-- Stats -->
        <div class="game-stats">
          <v-card class="stat-card" elevation="6">
            <v-card-text class="text-center">
              <div class="stat-number">3200</div>
              <div class="stat-label">Matches played</div>
            </v-card-text>
          </v-card>

          <v-card class="stat-card" elevation="6">
            <v-card-text class="text-center">
              <div class="stat-number">295</div>
              <div class="stat-label">Tournament wins</div>
            </v-card-text>
          </v-card>

          <v-card class="stat-card winrate-card" elevation="6">
            <v-card-text class="text-center">
              <span class="winrate-number">92.1%</span>
              <div class="winrate-icons flex justify-center gap-2 mt-2">
                <v-icon size="20" color="#00FF88">mdi-chart-line</v-icon>
                <v-icon size="20" color="#00FF88">mdi-trending-up</v-icon>
                <v-icon size="20" color="#00FF88">mdi-target</v-icon>
              </div>
              <div class="stat-label mt-1">Win Rate</div>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-top: 400px;
  z-index: 2;
}

.game-info {
  display: flex;
  gap: 24px;
  align-items: center;
  flex: 1;
}

.game-logo img {
  width: 80px;
  height: 120px;
  border-radius: 8px;
}

.game-title {
  font-size: 36px;
  font-weight: 600;
  color: #ffffff;
  line-height: 1.1;
  margin: 0 0 8px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.95);
}

.game-description {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 24px 0;
}

.game-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: center;
  margin-top: -100px;
  width: 100%;
}

.game-stats {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
  flex-wrap: wrap;
  width: 100%;
}

.stat-card {
  flex: 1;
  max-width: 200px;
  height: 80px;
  margin-bottom: 20px;
  color: white;
  text-align: center;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(4px);
  transition: background-color 0.5s ease;
  animation: float 3s ease-in-out infinite;
}

.stat-card:nth-child(1) {
  animation-delay: 0s;
}
.stat-card:nth-child(2) {
  animation-delay: 0.3s;
}
.stat-card:nth-child(3) {
  animation-delay: 0.6s;
}

.stat-card:hover {
  background-color: #00d4aa;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(0px);
  }
}

.winrate-card {
  background: linear-gradient(135deg, #1f3a2e, #2d5a3f);
}

.winrate-number {
  font-size: 22px;
  color: #00ff88;
}

.winrate-icons {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.stat-number {
  font-size: 24px;
}

.stat-label {
  font-size: 14px;
  opacity: 0.8;
}

/* Responsive */
@media (max-width: 768px) {
  .game-header {
    flex-direction: column;
    text-align: center;
    margin-top: 200px;
  }

  .game-details {
    align-items: center;
    margin-top: 0;
  }

  .game-stats {
    flex-direction: column;
    align-items: center;
  }

  .stat-card {
    max-width: 100%;
    width: 100%;
  }

  .game-title {
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .game-title {
    font-size: 20px;
  }

  .stat-number {
    font-size: 20px;
  }
}
</style>
