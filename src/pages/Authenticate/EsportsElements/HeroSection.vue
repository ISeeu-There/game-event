<template>
  <!-- Hero Section -->
  <div class="hero-section">
    <div class="hero-content">
      <div class="hero-badge">
        <v-icon class="mr-2">mdi-trophy</v-icon>
        ESPORTS ARENA
      </div>
      <h1 class="hero-title">
        Competitive <span class="gradient-text">Gaming</span>
      </h1>
      <p class="hero-subtitle">
        Watch live tournaments, follow your favorite teams, and witness epic
        battles
      </p>
      <div class="hero-stats">
        <div class="stat-item">
          <div class="stat-number">{{ activeTournaments }}</div>
          <div class="stat-label">Active Tournaments</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-number">{{ totalTeams.toLocaleString() }}</div>
          <div class="stat-label">Registered Teams</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-number">${{ totalPrizePool.toLocaleString() }}</div>
          <div class="stat-label">Prize Pool</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// Interfaces
interface Tournament {
  id: number;
  name: string;
  game: string;
  format: string;
  image: string;
  startDate: string;
  participants: number;
  prizePool: number;
  status: "Upcoming" | "Live" | "Completed";
  isFavorite: boolean;
}

interface Team {
  id: number;
  name: string;
  logo: string;
  region: string;
  rank: number;
  wins: number;
  losses: number;
  winRate: number;
  earnings: number;
  points: number;
  isFollowed: boolean;
}

// Sample tournaments
const tournaments = ref<Tournament[]>([
  {
    id: 1,
    name: "World Championship 2024",
    game: "Valorant",
    format: "Single Elimination",
    image: "https://picsum.photos/400/300?random=20",
    startDate: "2024-10-15",
    participants: 16,
    prizePool: 500000,
    status: "Live",
    isFavorite: false,
  },
  {
    id: 2,
    name: "Summer Split Finals",
    game: "League of Legends",
    format: "Best of 5",
    image: "https://picsum.photos/400/300?random=21",
    startDate: "2024-09-28",
    participants: 8,
    prizePool: 250000,
    status: "Upcoming",
    isFavorite: true,
  },
]);

// Sample teams
const teams = ref<Team[]>([
  {
    id: 1,
    name: "Team Alpha",
    logo: "https://picsum.photos/100/100?random=30",
    region: "North America",
    rank: 1,
    wins: 28,
    losses: 5,
    winRate: 85,
    earnings: 125000,
    points: 2850,
    isFollowed: true,
  },
  {
    id: 2,
    name: "Phoenix Rising",
    logo: "https://picsum.photos/100/100?random=31",
    region: "Europe",
    rank: 2,
    wins: 25,
    losses: 8,
    winRate: 76,
    earnings: 98000,
    points: 2650,
    isFollowed: false,
  },
]);

// Computed stats
const activeTournaments = computed(
  () =>
    tournaments.value.filter(
      (t) => t.status === "Live" || t.status === "Upcoming"
    ).length
);
const totalTeams = computed(() => teams.value.length * 15); // simulate more teams
const totalPrizePool = computed(() =>
  tournaments.value.reduce((sum, t) => sum + t.prizePool, 0)
);
</script>

<style scoped>
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
  margin-top: 20px;
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

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.25rem;
  }
  .hero-subtitle {
    font-size: 1rem;
  }
  .hero-stats {
    flex-direction: column;
    gap: 1.5rem;
  }
  .stat-divider {
    display: none;
  }
}
</style>
