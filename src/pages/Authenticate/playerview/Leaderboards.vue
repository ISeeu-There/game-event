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

      <!-- Leaderboard Content -->
      <v-container fluid class="leaderboard-container">
        <!-- Hero Section -->
        <div class="hero-section">
          <div class="hero-content">
            <div class="hero-badge">
              <v-icon class="mr-2">mdi-trophy</v-icon>
              GLOBAL LEADERBOARD
            </div>
            <h1 class="hero-title">
              Elite <span class="gradient-text">Champions</span>
            </h1>
            <p class="hero-subtitle">
              Discover the top performers dominating tournaments worldwide
            </p>
            <div class="hero-stats">
              <div class="stat-item">
                <div class="stat-number">
                  {{ totalPlayers.toLocaleString() }}+
                </div>
                <div class="stat-label">Active Players</div>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <div class="stat-number">
                  {{ totalMatches.toLocaleString() }}+
                </div>
                <div class="stat-label">Matches Played</div>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <div class="stat-number">
                  ${{ totalPrizePool.toLocaleString() }}+
                </div>
                <div class="stat-label">Total Prize Pool</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Filters and Controls -->
        <v-row class="controls-section mb-6">
          <v-col cols="12">
            <v-card class="controls-card glass-card" elevation="0">
              <v-card-text class="controls-content">
                <div class="filters-row">
                  <div class="filter-group">
                    <label class="filter-label">Game Mode</label>
                    <v-select
                      v-model="selectedGameMode"
                      :items="gameModes"
                      variant="outlined"
                      density="compact"
                      class="filter-select"
                      hide-details
                    ></v-select>
                  </div>

                  <div class="filter-group">
                    <label class="filter-label">Time Period</label>
                    <v-select
                      v-model="selectedPeriod"
                      :items="timePeriods"
                      variant="outlined"
                      density="compact"
                      class="filter-select"
                      hide-details
                    ></v-select>
                  </div>
                  <div class="search-group">
                    <v-text-field
                      v-model="searchQuery"
                      placeholder="Search players..."
                      variant="outlined"
                      density="compact"
                      hide-details
                      class="search-field"
                    >
                      <template v-slot:prepend-inner>
                        <div>
                          <v-icon>mdi-magnify</v-icon>
                        </div>
                      </template>
                    </v-text-field>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Top 3 Podium -->
        <div class="podium-section mb-8">
          <div class="section-header text-center">
            <h2 class="section-title">Hall of Fame</h2>
            <p class="section-subtitle">
              The elite champions leading the competition
            </p>
          </div>

          <div class="podium-container">
            <div
              v-for="(player, index) in topThreePlayers"
              :key="player.id"
              class="podium-player"
              :class="`position-${index + 1}`"
            >
              <div class="podium-card glass-card">
                <div class="podium-rank">
                  <div class="rank-circle" :class="`rank-${index + 1}`">
                    <v-icon v-if="index === 0" color="#FFD700" size="24"
                      >mdi-crown</v-icon
                    >
                    <v-icon v-else-if="index === 1" color="#C0C0C0" size="20"
                      >mdi-medal</v-icon
                    >
                    <v-icon v-else color="#CD7F32" size="20">mdi-medal</v-icon>
                  </div>
                  <span class="rank-number">#{{ index + 1 }}</span>
                </div>

                <div class="player-avatar-wrapper">
                  <div class="avatar-glow" :class="`glow-${index + 1}`"></div>
                  <v-avatar size="80" class="player-avatar">
                    <v-img :src="player.avatar" :alt="player.name"></v-img>
                  </v-avatar>
                  <div class="status-indicator" :class="player.status"></div>
                </div>

                <div class="player-info">
                  <h3 class="player-name">{{ player.name }}</h3>
                  <p class="player-title">{{ player.title }}</p>
                  <div class="player-stats">
                    <div class="stat">
                      <span class="stat-value">{{
                        player.score.toLocaleString()
                      }}</span>
                      <span class="stat-label">Score</span>
                    </div>
                    <div class="stat">
                      <span class="stat-value">{{ player.winRate }}%</span>
                      <span class="stat-label">Win Rate</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Full Leaderboard Table -->
        <div class="leaderboard-section">
          <v-card class="leaderboard-card glass-card" elevation="0">
            <v-card-title class="leaderboard-header">
              <div class="header-content">
                <div class="header-title">
                  <v-icon class="mr-3" color="primary"
                    >mdi-format-list-numbered</v-icon
                  >
                  Global Rankings
                </div>
                <div class="header-actions">
                  <v-btn
                    variant="outlined"
                    size="small"
                    @click="refreshLeaderboard"
                    :loading="isRefreshing"
                  >
                    <v-icon start>mdi-refresh</v-icon>
                    Refresh
                  </v-btn>
                </div>
              </div>
            </v-card-title>

            <div class="leaderboard-table">
              <div class="table-header">
                <div class="header-cell rank-col">Rank</div>
                <div class="header-cell player-col">Player</div>
                <div class="header-cell score-col">Score</div>
                <div class="header-cell matches-col">Matches</div>
                <div class="header-cell winrate-col">Win Rate</div>
                <div class="header-cell earnings-col">Earnings</div>
                <div class="header-cell trend-col">Trend</div>
              </div>

              <div class="table-body">
                <div
                  v-for="(player, index) in paginatedPlayers"
                  :key="player.id"
                  class="table-row player-row"
                  :class="{
                    'highlight-row': player.isCurrentUser,
                    'animate-row': true,
                  }"
                  :style="{ animationDelay: `${index * 0.05}s` }"
                >
                  <div class="table-cell rank-col">
                    <div class="rank-display">
                      <span class="rank-number">#{{ player.rank }}</span>
                      <div v-if="player.rankChange" class="rank-change">
                        <v-icon
                          :color="player.rankChange > 0 ? 'success' : 'error'"
                          size="14"
                        >
                          {{
                            player.rankChange > 0
                              ? "mdi-arrow-up"
                              : "mdi-arrow-down"
                          }}
                        </v-icon>
                        <span>{{ Math.abs(player.rankChange) }}</span>
                      </div>
                    </div>
                  </div>

                  <div class="table-cell player-col">
                    <div class="player-display">
                      <div class="player-avatar-small">
                        <v-avatar size="40">
                          <v-img
                            :src="player.avatar"
                            :alt="player.name"
                          ></v-img>
                        </v-avatar>
                        <div class="status-dot" :class="player.status"></div>
                      </div>
                      <div class="player-details">
                        <div class="player-name">{{ player.name }}</div>
                        <div class="player-country">
                          <span class="flag">{{ player.country.flag }}</span>
                          {{ player.country.name }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="table-cell score-col">
                    <div class="score-display">
                      <span class="score-value">{{
                        player.score.toLocaleString()
                      }}</span>
                      <div
                        v-if="player.scoreChange"
                        class="score-change"
                        :class="
                          player.scoreChange > 0 ? 'positive' : 'negative'
                        "
                      >
                        {{ player.scoreChange > 0 ? "+" : ""
                        }}{{ player.scoreChange }}
                      </div>
                    </div>
                  </div>

                  <div class="table-cell matches-col">
                    <div class="matches-display">
                      <span class="matches-total">{{
                        player.totalMatches
                      }}</span>
                      <span class="matches-record"
                        >{{ player.wins }}W / {{ player.losses }}L</span
                      >
                    </div>
                  </div>

                  <div class="table-cell winrate-col">
                    <div class="winrate-display">
                      <span class="winrate-value">{{ player.winRate }}%</span>
                      <v-progress-linear
                        :model-value="player.winRate"
                        color="primary"
                        height="4"
                        rounded
                        class="winrate-bar"
                      ></v-progress-linear>
                    </div>
                  </div>

                  <div class="table-cell earnings-col">
                    <div class="earnings-display">
                      <span class="earnings-value"
                        >${{ player.earnings.toLocaleString() }}</span
                      >
                    </div>
                  </div>

                  <div class="table-cell trend-col">
                    <div class="trend-display">
                      <div class="trend-chart">
                        <svg width="60" height="30">
                          <polyline
                            :points="generateTrendPoints(player.trendData)"
                            fill="none"
                            :stroke="getTrendColor(player.trendData)"
                            stroke-width="2"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <div class="pagination-section">
              <v-pagination
                v-model="currentPage"
                :length="totalPages"
                :total-visible="7"
                color="transparent"
                variant="elevated"
                class="custom-pagination"
              ></v-pagination>
            </div>
          </v-card>
        </div>

        <!-- Player Profile Modal -->
        <v-dialog v-model="playerDialog" max-width="800" persistent>
          <v-card
            v-if="selectedPlayer"
            class="player-modal glass-card"
            elevation="0"
          >
            <div class="modal-header">
              <div class="player-header-info">
                <v-avatar size="80" class="modal-avatar">
                  <v-img
                    :src="selectedPlayer.avatar"
                    :alt="selectedPlayer.name"
                  ></v-img>
                </v-avatar>

                <div class="modal-player-details">
                  <h2 class="modal-player-name">{{ selectedPlayer.name }}</h2>
                  <p class="modal-player-title">{{ selectedPlayer.title }}</p>
                  <div class="modal-player-stats">
                    <span class="modal-rank"
                      >#{{ selectedPlayer.rank }} Global</span
                    >
                    <span class="modal-country"
                      >{{ selectedPlayer.country.flag }}
                      {{ selectedPlayer.country.name }}</span
                    >
                  </div>
                </div>
              </div>
            </div>

            <v-card-text class="modal-content">
              <div class="stats-grid">
                <div class="stat-card">
                  <div class="stat-icon">
                    <v-icon color="primary" size="24">mdi-trophy</v-icon>
                  </div>
                  <div class="stat-info">
                    <div class="stat-value">
                      {{ selectedPlayer.score.toLocaleString() }}
                    </div>
                    <div class="stat-label">Total Score</div>
                  </div>
                </div>

                <div class="stat-card">
                  <div class="stat-icon">
                    <v-icon color="success" size="24">mdi-percent</v-icon>
                  </div>
                  <div class="stat-info">
                    <div class="stat-value">{{ selectedPlayer.winRate }}%</div>
                    <div class="stat-label">Win Rate</div>
                  </div>
                </div>

                <div class="stat-card">
                  <div class="stat-icon">
                    <v-icon color="warning" size="24">mdi-currency-usd</v-icon>
                  </div>
                  <div class="stat-info">
                    <div class="stat-value">
                      ${{ selectedPlayer.earnings.toLocaleString() }}
                    </div>
                    <div class="stat-label">Earnings</div>
                  </div>
                </div>

                <div class="stat-card">
                  <div class="stat-icon">
                    <v-icon color="info" size="24">mdi-gamepad-variant</v-icon>
                  </div>
                  <div class="stat-info">
                    <div class="stat-value">
                      {{ selectedPlayer.totalMatches }}
                    </div>
                    <div class="stat-label">Matches</div>
                  </div>
                </div>
              </div>
            </v-card-text>

            <v-card-actions class="modal-actions">
              <v-spacer></v-spacer>
              <v-btn variant="outlined" @click="playerDialog = false"
                >Close</v-btn
              >
              <v-btn color="primary" variant="elevated"
                >View Full Profile</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import SideBarHeader from "../HomeElements/SideBarHeader.vue";
import NavMenuSideBar from "../HomeElements/NavMenuSideBar.vue";
import TopNav from "../HomeElements/TopNav.vue";
import * as directives from "vuetify/directives";

interface Player {
  id: string;
  name: string;
  avatar: string;
  title: string;
  rank: number;
  score: number;
  winRate: number;
  totalMatches: number;
  wins: number;
  losses: number;
  earnings: number;
  country: {
    name: string;
    flag: string;
  };
  status: "online" | "offline" | "in-game";
  rankChange?: number;
  scoreChange?: number;
  isCurrentUser?: boolean;
  trendData: number[];
}

const isSidebarOpen = ref(false);
const playerDialog = ref(false);
const selectedPlayer = ref<Player | null>(null);
const isRefreshing = ref(false);
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = 20;

// Filters
const selectedGameMode = ref("All Modes");
const selectedPeriod = ref("All Time");

const gameModes = [
  "All Modes",
  "Battle Royale",
  "Team Deathmatch",
  "1v1 Arena",
  "Capture Flag",
];
const timePeriods = ["All Time", "This Week", "This Month", "This Season"];

// Mock data
const totalPlayers = ref(125847);
const totalMatches = ref(2847563);
const totalPrizePool = ref(5420000);

const players = ref<Player[]>([
  {
    id: "1",
    name: "ShadowMaster",
    avatar: "https://i.pravatar.cc/150?img=1",
    title: "Legendary Champion",
    rank: 1,
    score: 98750,
    winRate: 94,
    totalMatches: 1247,
    wins: 1172,
    losses: 75,
    earnings: 245000,
    country: { name: "South Korea", flag: "🇰🇷" },
    status: "online",
    rankChange: 0,
    scoreChange: 250,
    trendData: [80, 85, 88, 92, 95, 94, 98],
  },
  {
    id: "2",
    name: "PhoenixRising",
    avatar: "https://i.pravatar.cc/150?img=2",
    title: "Elite Warrior",
    rank: 2,
    score: 95420,
    winRate: 91,
    totalMatches: 1156,
    wins: 1052,
    losses: 104,
    earnings: 198000,
    country: { name: "United States", flag: "🇺🇸" },
    status: "in-game",
    rankChange: 1,
    scoreChange: 180,
    trendData: [75, 80, 85, 89, 91, 93, 95],
  },
  {
    id: "3",
    name: "StormBreaker",
    avatar: "https://i.pravatar.cc/150?img=3",
    title: "Master Tactician",
    rank: 3,
    score: 92180,
    winRate: 89,
    totalMatches: 1089,
    wins: 969,
    losses: 120,
    earnings: 176000,
    country: { name: "Germany", flag: "🇩🇪" },
    status: "online",
    rankChange: -1,
    scoreChange: -45,
    trendData: [85, 87, 90, 92, 88, 89, 92],
  },
  // Additional players...
  ...Array.from({ length: 47 }, (_, i) => ({
    id: (i + 4).toString(),
    name: `Player${i + 4}`,
    avatar: `https://i.pravatar.cc/150?img=${(i % 20) + 4}`,
    title: ["Rising Star", "Veteran Player", "Pro Gamer", "Elite Fighter"][
      i % 4
    ],
    rank: i + 4,
    score: Math.floor(Math.random() * 50000) + 40000,
    winRate: Math.floor(Math.random() * 40) + 60,
    totalMatches: Math.floor(Math.random() * 800) + 200,
    wins: 0,
    losses: 0,
    earnings: Math.floor(Math.random() * 100000) + 10000,
    country: {
      name: ["Japan", "Canada", "Brazil", "France", "Australia"][i % 5],
      flag: ["🇯🇵", "🇨🇦", "🇧🇷", "🇫🇷", "🇦🇺"][i % 5],
    },
    status: ["online", "offline", "in-game"][i % 3] as
      | "online"
      | "offline"
      | "in-game",
    rankChange: Math.floor(Math.random() * 10) - 5,
    scoreChange: Math.floor(Math.random() * 200) - 100,
    isCurrentUser: i === 12,
    trendData: Array.from(
      { length: 7 },
      () => Math.floor(Math.random() * 40) + 60
    ),
  })),
]);

// Calculate wins and losses for generated players
players.value.forEach((player) => {
  player.wins = Math.floor(player.totalMatches * (player.winRate / 100));
  player.losses = player.totalMatches - player.wins;
});

const topThreePlayers = computed(() => players.value.slice(0, 3));

const filteredPlayers = computed(() => {
  let filtered = [...players.value];

  if (searchQuery.value) {
    filtered = filtered.filter((player) =>
      player.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  return filtered;
});

const totalPages = computed(() =>
  Math.ceil(filteredPlayers.value.length / itemsPerPage)
);

const paginatedPlayers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredPlayers.value.slice(start, end);
});

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}

function refreshLeaderboard() {
  isRefreshing.value = true;
  setTimeout(() => {
    isRefreshing.value = false;
  }, 1500);
}

function openPlayerProfile(player: Player) {
  selectedPlayer.value = player;
  playerDialog.value = true;
}

function generateTrendPoints(data: number[]): string {
  const width = 60;
  const height = 30;
  const points = data.map((value, index) => {
    const x = (index * width) / (data.length - 1);
    const y =
      height -
      ((value - Math.min(...data)) / (Math.max(...data) - Math.min(...data))) *
        height;
    return `${x},${y}`;
  });
  return points.join(" ");
}

function getTrendColor(data: number[]): string {
  const first = data[0];
  const last = data[data.length - 1];
  return last > first ? "#4caf50" : last < first ? "#f44336" : "#2196f3";
}

onMounted(() => {
  // Add click event to player rows
  setTimeout(() => {
    const playerRows = document.querySelectorAll(".player-row");
    playerRows.forEach((row, index) => {
      row.addEventListener("click", () => {
        const player = paginatedPlayers.value[index];
        if (player) {
          openPlayerProfile(player);
        }
      });
    });
  }, 100);
});
</script>

<style scoped>
/* Base Styles */
.gaming-platform {
  display: flex;
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
    radial-gradient(1px 1px at 90px 40px, rgba(255, 255, 255, 0.1), transparent);
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

.leaderboard-container {
  padding: 0;
  max-width: 1600px;
  margin: 0 auto;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(
    135deg,
    rgba(255, 215, 0, 0.1) 0%,
    rgba(33, 150, 243, 0.1) 100%
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
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,215,0,0.1)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)" /></svg>')
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
  background: rgba(255, 215, 0, 0.2);
  border: 1px solid rgba(255, 215, 0, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #ffd700;
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
  background: linear-gradient(135deg, #ffd700, #ff6b35, #e91e63);
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
.search-group {
  margin-top: 20px;
}
.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ffd700, #ff6b35);
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
/* Leaderboard Section */

.leaderboard-card {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
}

/* Podium Section */
.podium-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.podium-player {
  flex: 1;
  max-width: 280px;
}

.podium-card {
  padding: 2rem 1rem;
  text-align: center;
  border-radius: 20px;
  backdrop-filter: blur(12px);
}
.controls-card {
  background-color: transparent;
  color: white;
}

/* Leaderboard Table */
.leaderboard-table {
  overflow-x: auto;
}

.table-header,
.table-row {
  display: grid;
  grid-template-columns: 80px 1.5fr 1fr 1fr 1fr 1fr 80px;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.table-row:hover {
  background: rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition: background 0.2s;
}

/* Player Modal */
.player-modal {
  border-radius: 16px;
  padding: 1rem;
}
.v-dialog > .v-overlay__content > .v-card,
.v-dialog > .v-overlay__content > form > .v-card {
  display: flex;
  flex-direction: column;
  background-color: #1a1d23;
  color: white;
}
.v-pagination .v-btn {
  border-radius: 50px;
  background-color: transparent !important;
}
/* RESPONSIVE DESIGN */
@media (max-width: 1200px) {
  .table-header,
  .table-row {
    grid-template-columns: 60px 1.5fr 1fr 1fr 1fr;
  }
  .gaming-platform {
    min-height: 100vh;
    min-width: 100vw;
    overflow-x: hidden;
  }
  .earnings-col,
  .trend-col {
    display: none;
  }
}

@media (max-width: 992px) {
  .main-content {
    margin-left: 0;
  }
  .gaming-platform {
    min-height: 100vh;
    min-width: 100vw;
    overflow-x: hidden;
  }
  .sidebar {
    transform: translateX(-100%);
  }

  .sidebar.active {
    transform: translateX(0);
  }

  .hero-section {
    padding: 2rem 1rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-stats {
    flex-direction: column;
    gap: 1rem;
  }

  .stat-divider {
    display: none;
  }

  .podium-container {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 600px) {
  .hero-title {
    font-size: 1.75rem;
  }
  .gaming-platform {
    min-height: 100vh;
    min-width: 100vw;
    overflow-x: hidden;
  }

  .hero-subtitle {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  .table-header,
  .table-row {
    grid-template-columns: 50px 1fr 1fr;
    font-size: 0.875rem;
  }

  .matches-col,
  .winrate-col,
  .earnings-col,
  .trend-col {
    display: none;
  }

  .player-avatar-small v-avatar {
    width: 30px;
    height: 30px;
  }

  .player-details .player-name {
    font-size: 0.9rem;
  }
}
</style>
