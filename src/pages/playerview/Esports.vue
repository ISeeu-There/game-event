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
      <!-- Top Nav -->
      <TopNav :toggleSidebar="toggleSidebar" />

      <!-- Esports Container -->
      <v-container fluid class="esports-container">
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
              Watch live tournaments, follow your favorite teams, and witness
              epic battles
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
                <div class="stat-number">
                  ${{ totalPrizePool.toLocaleString() }}
                </div>
                <div class="stat-label">Prize Pool</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Live Matches Section -->
        <v-card class="glass-card mb-8">
          <v-card-title class="section-title">
            <v-icon class="mr-3" color="red">mdi-circle</v-icon>
            Live Matches
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                v-for="match in liveMatches"
                :key="match.id"
                cols="12"
                md="6"
                lg="4"
              >
                <v-card class="match-card glass-card">
                  <div class="match-header">
                    <div class="tournament-name">{{ match.tournament }}</div>
                    <div class="match-status live">LIVE</div>
                  </div>
                  <div class="match-teams">
                    <div class="team">
                      <v-avatar size="40" class="team-logo">
                        <v-img :src="match.team1.logo" />
                      </v-avatar>
                      <div class="team-info">
                        <div class="team-name">{{ match.team1.name }}</div>
                        <div class="team-score">{{ match.team1.score }}</div>
                      </div>
                    </div>
                    <div class="vs-divider">VS</div>
                    <div class="team">
                      <div class="team-info">
                        <div class="team-name">{{ match.team2.name }}</div>
                        <div class="team-score">{{ match.team2.score }}</div>
                      </div>
                      <v-avatar size="40" class="team-logo">
                        <v-img :src="match.team2.logo" />
                      </v-avatar>
                    </div>
                  </div>
                  <div class="match-actions">
                    <v-btn
                      color="red"
                      variant="outlined"
                      @click="watchMatch(match)"
                    >
                      <v-icon class="mr-2">mdi-play</v-icon>
                      Watch Live
                    </v-btn>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Navigation Tabs -->
        <v-tabs v-model="activeTab" class="mb-6" color="primary">
          <v-tab value="tournaments">
            <v-icon class="mr-2">mdi-trophy</v-icon>
            Tournaments
          </v-tab>
          <v-tab value="teams">
            <v-icon class="mr-2">mdi-account-group</v-icon>
            Teams
          </v-tab>
          <v-tab value="schedule">
            <v-icon class="mr-2">mdi-calendar</v-icon>
            Schedule
          </v-tab>
          <v-tab value="leaderboard">
            <v-icon class="mr-2">mdi-podium</v-icon>
            Leaderboard
          </v-tab>
        </v-tabs>

        <!-- Tab Content -->
        <v-window v-model="activeTab">
          <!-- Tournaments Tab -->
          <v-window-item value="tournaments">
            <v-row>
              <v-col
                v-for="tournament in tournaments"
                :key="tournament.id"
                cols="12"
                md="6"
                lg="4"
              >
                <v-card class="tournament-card glass-card">
                  <v-img
                    :src="tournament.image"
                    height="200"
                    class="tournament-image"
                  >
                    <div class="tournament-overlay">
                      <div
                        class="tournament-status"
                        :class="tournament.status.toLowerCase()"
                      >
                        {{ tournament.status }}
                      </div>
                    </div>
                  </v-img>
                  <v-card-title class="tournament-title">
                    {{ tournament.name }}
                  </v-card-title>
                  <v-card-subtitle>
                    {{ tournament.game }} • {{ tournament.format }}
                  </v-card-subtitle>
                  <v-card-text>
                    <div class="tournament-info">
                      <div class="info-row">
                        <v-icon class="mr-2" size="small">mdi-calendar</v-icon>
                        {{ formatDate(tournament.startDate) }}
                      </div>
                      <div class="info-row">
                        <v-icon class="mr-2" size="small"
                          >mdi-account-group</v-icon
                        >
                        {{ tournament.participants }} teams
                      </div>
                      <div class="info-row">
                        <v-icon class="mr-2" size="small"
                          >mdi-currency-usd</v-icon
                        >
                        ${{ tournament.prizePool.toLocaleString() }}
                      </div>
                    </div>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="primary" @click="viewTournament(tournament)">
                      View Details
                    </v-btn>
                    <v-spacer />
                    <v-btn icon @click="toggleFavorite(tournament)">
                      <v-icon :color="tournament.isFavorite ? 'red' : 'grey'">
                        mdi-heart
                      </v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-window-item>

          <!-- Teams Tab -->
          <v-window-item value="teams">
            <v-row>
              <v-col
                v-for="team in teams"
                :key="team.id"
                cols="12"
                md="6"
                lg="4"
              >
                <v-card class="team-card glass-card">
                  <div class="team-header">
                    <v-avatar size="60" class="team-avatar">
                      <v-img :src="team.logo" />
                    </v-avatar>
                    <div class="team-details">
                      <div class="team-name">{{ team.name }}</div>
                      <div class="team-region">{{ team.region }}</div>
                    </div>
                    <div class="team-rank">#{{ team.rank }}</div>
                  </div>
                  <v-card-text>
                    <div class="team-stats">
                      <div class="stat-row">
                        <span class="stat-label">Wins</span>
                        <span class="stat-value">{{ team.wins }}</span>
                      </div>
                      <div class="stat-row">
                        <span class="stat-label">Losses</span>
                        <span class="stat-value">{{ team.losses }}</span>
                      </div>
                      <div class="stat-row">
                        <span class="stat-label">Win Rate</span>
                        <span class="stat-value">{{ team.winRate }}%</span>
                      </div>
                      <div class="stat-row">
                        <span class="stat-label">Earnings</span>
                        <span class="stat-value"
                          >${{ team.earnings.toLocaleString() }}</span
                        >
                      </div>
                    </div>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="primary" @click="viewTeam(team)">
                      View Team
                    </v-btn>
                    <v-spacer />
                    <v-btn icon @click="followTeam(team)">
                      <v-icon :color="team.isFollowed ? 'primary' : 'grey'">
                        mdi-account-plus
                      </v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-window-item>

          <!-- Schedule Tab -->
          <v-window-item value="schedule">
            <v-card class="glass-card">
              <v-card-title>
                <v-icon class="mr-2">mdi-calendar</v-icon>
                Upcoming Matches
              </v-card-title>
              <v-card-text>
                <div class="schedule-list">
                  <div
                    v-for="match in upcomingMatches"
                    :key="match.id"
                    class="schedule-item"
                  >
                    <div class="match-time">
                      <div class="date">{{ formatDate(match.date) }}</div>
                      <div class="time">{{ formatTime(match.time) }}</div>
                    </div>
                    <div class="match-info">
                      <div class="tournament-info">
                        <span class="tournament">{{ match.tournament }}</span>
                        <span class="stage">{{ match.stage }}</span>
                      </div>
                      <div class="teams-info">
                        <div class="team">
                          <v-avatar size="24" class="mr-2">
                            <v-img :src="match.team1.logo" />
                          </v-avatar>
                          {{ match.team1.name }}
                        </div>
                        <span class="vs">vs</span>
                        <div class="team">
                          {{ match.team2.name }}
                          <v-avatar size="24" class="ml-2">
                            <v-img :src="match.team2.logo" />
                          </v-avatar>
                        </div>
                      </div>
                    </div>
                    <div class="match-actions">
                      <v-btn size="small" color="primary" variant="outlined">
                        Set Reminder
                      </v-btn>
                    </div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-window-item>

          <!-- Leaderboard Tab -->
          <v-window-item value="leaderboard">
            <v-card class="glass-card">
              <v-card-title>
                <v-icon class="mr-2">mdi-podium</v-icon>
                Team Rankings
              </v-card-title>
              <v-card-text>
                <div class="leaderboard-list">
                  <div
                    v-for="(team, index) in rankedTeams"
                    :key="team.id"
                    class="leaderboard-item"
                  >
                    <div class="rank" :class="getRankClass(index + 1)">
                      {{ index + 1 }}
                    </div>
                    <v-avatar size="40" class="team-avatar">
                      <v-img :src="team.logo" />
                    </v-avatar>
                    <div class="team-info">
                      <div class="team-name">{{ team.name }}</div>
                      <div class="team-region">{{ team.region }}</div>
                    </div>
                    <div class="team-stats">
                      <div class="stat">
                        <span class="label">Points</span>
                        <span class="value">{{ team.points }}</span>
                      </div>
                      <div class="stat">
                        <span class="label">W/L</span>
                        <span class="value"
                          >{{ team.wins }}/{{ team.losses }}</span
                        >
                      </div>
                      <div class="stat">
                        <span class="label">Earnings</span>
                        <span class="value"
                          >${{ team.earnings.toLocaleString() }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-window-item>
        </v-window>
      </v-container>
    </div>

    <!-- Live Stream Modal -->
    <v-dialog v-model="streamDialog" max-width="900px">
      <v-card v-if="selectedMatch" class="glass-card">
        <v-toolbar color="red" dark>
          <v-toolbar-title>
            <v-icon class="mr-2">mdi-circle</v-icon>
            Live Stream - {{ selectedMatch.tournament }}
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
            <p>
              {{ selectedMatch.team1.name }} vs {{ selectedMatch.team2.name }}
            </p>
          </div>
        </div>
        <v-card-actions>
          <v-btn color="primary" @click="toggleFullscreen">
            <v-icon class="mr-2">mdi-fullscreen</v-icon>
            Fullscreen
          </v-btn>
          <v-btn color="grey" @click="toggleQuality">
            <v-icon class="mr-2">mdi-cog</v-icon>
            Quality
          </v-btn>
          <v-spacer />
          <v-chip color="red" variant="outlined">
            <v-icon class="mr-1" size="small">mdi-circle</v-icon>
            {{ Math.floor(Math.random() * 10000) + 1000 }} viewers
          </v-chip>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import SideBarHeader from "../HomeElements/SideBarHeader.vue";
import NavMenuSideBar from "../HomeElements/NavMenuSideBar.vue";
import TopNav from "../HomeElements/TopNav.vue";

// Sidebar
const isSidebarOpen = ref(false);
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

// Tab management
const activeTab = ref("tournaments");

// Interface definitions
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

interface Match {
  id: number;
  tournament: string;
  stage: string;
  team1: {
    name: string;
    logo: string;
    score: number;
  };
  team2: {
    name: string;
    logo: string;
    score: number;
  };
  date: string;
  time: string;
}

// Sample data
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
  {
    id: 3,
    name: "Masters Tournament",
    game: "CS2",
    format: "Swiss System",
    image: "https://picsum.photos/400/300?random=22",
    startDate: "2024-11-01",
    participants: 24,
    prizePool: 750000,
    status: "Upcoming",
    isFavorite: false,
  },
]);

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
  {
    id: 3,
    name: "Dragon Force",
    logo: "https://picsum.photos/100/100?random=32",
    region: "Asia",
    rank: 3,
    wins: 22,
    losses: 11,
    winRate: 67,
    earnings: 87000,
    points: 2420,
    isFollowed: true,
  },
]);

const liveMatches = ref<Match[]>([
  {
    id: 1,
    tournament: "World Championship",
    stage: "Quarter Finals",
    team1: {
      name: "Team Alpha",
      logo: "https://picsum.photos/100/100?random=30",
      score: 2,
    },
    team2: {
      name: "Phoenix Rising",
      logo: "https://picsum.photos/100/100?random=31",
      score: 1,
    },
    date: "2024-09-24",
    time: "20:00",
  },
  {
    id: 2,
    tournament: "Masters Tournament",
    stage: "Semi Finals",
    team1: {
      name: "Dragon Force",
      logo: "https://picsum.photos/100/100?random=32",
      score: 0,
    },
    team2: {
      name: "Storm Riders",
      logo: "https://picsum.photos/100/100?random=33",
      score: 1,
    },
    date: "2024-09-24",
    time: "22:00",
  },
]);

const upcomingMatches = ref<Match[]>([
  {
    id: 3,
    tournament: "Summer Split Finals",
    stage: "Finals",
    team1: {
      name: "Team Alpha",
      logo: "https://picsum.photos/100/100?random=30",
      score: 0,
    },
    team2: {
      name: "Phoenix Rising",
      logo: "https://picsum.photos/100/100?random=31",
      score: 0,
    },
    date: "2024-09-25",
    time: "19:00",
  },
  {
    id: 4,
    tournament: "World Championship",
    stage: "Group Stage",
    team1: {
      name: "Dragon Force",
      logo: "https://picsum.photos/100/100?random=32",
      score: 0,
    },
    team2: {
      name: "Storm Riders",
      logo: "https://picsum.photos/100/100?random=33",
      score: 0,
    },
    date: "2024-09-26",
    time: "21:30",
  },
]);

// Stream modal
const streamDialog = ref(false);
const selectedMatch = ref<Match | null>(null);

// Computed properties
const activeTournaments = computed(
  () =>
    tournaments.value.filter(
      (t) => t.status === "Live" || t.status === "Upcoming"
    ).length
);
const totalTeams = computed(() => teams.value.length * 15); // Simulate more teams
const totalPrizePool = computed(() =>
  tournaments.value.reduce((sum, t) => sum + t.prizePool, 0)
);
const rankedTeams = computed(() =>
  [...teams.value].sort((a, b) => b.points - a.points)
);

// Methods
const watchMatch = (match: Match) => {
  selectedMatch.value = match;
  streamDialog.value = true;
};

const viewTournament = (tournament: Tournament) => {
  console.log("Viewing tournament:", tournament.name);
};

const toggleFavorite = (tournament: Tournament) => {
  tournament.isFavorite = !tournament.isFavorite;
};

const viewTeam = (team: Team) => {
  console.log("Viewing team:", team.name);
};

const followTeam = (team: Team) => {
  team.isFollowed = !team.isFollowed;
};

const toggleFullscreen = () => {
  console.log("Toggle fullscreen");
};

const toggleQuality = () => {
  console.log("Toggle quality");
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

const formatTime = (timeString: string) => {
  return timeString;
};

const getRankClass = (rank: number) => {
  if (rank === 1) return "rank-gold";
  if (rank === 2) return "rank-silver";
  if (rank === 3) return "rank-bronze";
  return "";
};
</script>

<style scoped>
/* Base Styles - Inherited from shop page */
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

/* Main Content */
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

/* Glass Card Effect */
.glass-card {
  background: rgba(26, 29, 35, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
}

/* Section Titles */
.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

/* Live Matches */
.match-card {
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.match-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
}

.match-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.tournament-name {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

.match-status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.match-status.live {
  background: rgba(244, 67, 54, 0.2);
  color: #f44336;
  border: 1px solid rgba(244, 67, 54, 0.3);
}

.match-teams {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.team {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.team-logo {
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.team-info {
  text-align: center;
}

.team-name {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.team-score {
  font-size: 1.5rem;
  font-weight: 800;
  color: #ffd700;
}

.vs-divider {
  font-size: 0.875rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  padding: 0 1rem;
}

.match-actions {
  text-align: center;
}

/* Tournament Cards */
.tournament-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.tournament-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.3);
}

.tournament-image {
  position: relative;
}

.tournament-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.7) 100%
  );
  display: flex;
  align-items: flex-end;
  padding: 1rem;
}

.tournament-status {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.tournament-status.live {
  background: rgba(244, 67, 54, 0.9);
  color: white;
}

.tournament-status.upcoming {
  background: rgba(33, 150, 243, 0.9);
  color: white;
}

.tournament-status.completed {
  background: rgba(76, 175, 80, 0.9);
  color: white;
}

.tournament-title {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.3;
}

.tournament-info {
  margin-top: 1rem;
}

.info-row {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
}

/* Team Cards */
.team-card {
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.team-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
}

.team-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.team-avatar {
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.team-details {
  flex: 1;
}

.team-details .team-name {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.team-region {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
}

.team-rank {
  font-size: 1.5rem;
  font-weight: 800;
  color: #ffd700;
  text-align: center;
  min-width: 60px;
}

.team-stats {
  display: grid;
  gap: 0.75rem;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-row:last-child {
  border-bottom: none;
}

.stat-label {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
}

.stat-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: #ffd700;
}

/* Schedule */
.schedule-list {
  display: grid;
  gap: 1rem;
}

.schedule-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  transition: background 0.2s ease;
}

.schedule-item:hover {
  background: rgba(255, 255, 255, 0.08);
}

.match-time {
  text-align: center;
  min-width: 100px;
}

.date {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.25rem;
}

.time {
  font-size: 1rem;
  font-weight: 600;
  color: #ffd700;
}

.match-info {
  flex: 1;
}

.tournament-info {
  margin-bottom: 0.5rem;
}

.tournament {
  font-size: 1rem;
  font-weight: 600;
  margin-right: 0.5rem;
}

.stage {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
}

.teams-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.teams-info .team {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
}

.vs {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 600;
}

.match-actions {
  min-width: 120px;
  text-align: right;
}

/* Leaderboard */
.leaderboard-list {
  display: grid;
  gap: 1rem;
}

.leaderboard-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  transition: background 0.2s ease;
}

.leaderboard-item:hover {
  background: rgba(255, 255, 255, 0.08);
}

.rank {
  font-size: 1.5rem;
  font-weight: 800;
  min-width: 40px;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
}

.rank-gold {
  color: #ffd700;
}

.rank-silver {
  color: #c0c0c0;
}

.rank-bronze {
  color: #cd7f32;
}

.leaderboard-item .team-info {
  flex: 1;
}

.leaderboard-item .team-name {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.leaderboard-item .team-region {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
}

.leaderboard-item .team-stats {
  display: flex;
  gap: 2rem;
}

.leaderboard-item .stat {
  text-align: center;
}

.leaderboard-item .label {
  display: block;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.25rem;
}

.leaderboard-item .value {
  font-size: 0.875rem;
  font-weight: 600;
  color: #ffd700;
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

/* Tabs */
.v-tabs {
  background: rgba(26, 29, 35, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
}

/* Responsive Design */
@media (max-width: 992px) {
  .main-content {
    display: flex;
    flex-direction: column;
    width: 400px;
    margin-left: 0;
  }

  .sidebar {
    transform: translateX(-100%);
  }

  .sidebar.active {
    transform: translateX(0);
  }

  .hero-section {
    padding: 2rem 1rem;
    margin-top: 60px;
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

  .match-teams {
    flex-direction: column;
    gap: 1rem;
  }

  .vs-divider {
    order: 2;
  }

  .schedule-item {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
    gap: 1rem;
  }

  .leaderboard-item {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
    gap: 1rem;
  }

  .leaderboard-item .team-stats {
    justify-content: center;
  }
}

@media (max-width: 600px) {
  .hero-title {
    font-size: 1.75rem;
  }

  .hero-subtitle {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  .team-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .match-card {
    padding: 1rem;
  }

  .tournament-card {
    margin-bottom: 1rem;
  }

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

.v-tabs .v-tab {
  color: rgba(255, 255, 255, 0.7) !important;
}

.v-tabs .v-tab--selected {
  color: #2196f3 !important;
}

.v-window {
  background: transparent !important;
}
</style>
