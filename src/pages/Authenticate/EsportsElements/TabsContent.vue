<template>
  <!-- Tabs -->
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
                  <v-icon class="mr-2" size="small">mdi-account-group</v-icon>
                  {{ tournament.participants }} teams
                </div>
                <div class="info-row">
                  <v-icon class="mr-2" size="small">mdi-currency-usd</v-icon>
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
        <v-col v-for="team in teams" :key="team.id" cols="12" md="6" lg="4">
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
                  <span class="stat-value">
                    ${{ team.earnings.toLocaleString() }}
                  </span>
                </div>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="viewTeam(team)"> View Team </v-btn>
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
                  <span class="label text-red">Points</span>
                  <span class="value">{{ team.points }}</span>
                </div>
                <div class="stat">
                  <span class="label text-green">W/L</span>
                  <span class="value">{{ team.wins }}/{{ team.losses }}</span>
                </div>
                <div class="stat">
                  <span class="label text-blue">Earnings</span>
                  <span class="value">
                    ${{ team.earnings.toLocaleString() }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-window-item>
  </v-window>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// Interfaces
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
  team1: { name: string; logo: string; score: number };
  team2: { name: string; logo: string; score: number };
  date: string;
  time: string;
}

// State
const activeTab = ref("tournaments");

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
]);

const upcomingMatches = ref<Match[]>([
  {
    id: 1,
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
]);

// Computed
const rankedTeams = computed(() =>
  [...teams.value].sort((a, b) => b.points - a.points)
);

// Methods
const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString();
const formatTime = (timeString: string) => timeString;
const getRankClass = (rank: number) => {
  if (rank === 1) return "rank-gold";
  if (rank === 2) return "rank-silver";
  if (rank === 3) return "rank-bronze";
  return "";
};
const viewTournament = (t: Tournament) =>
  console.log("Viewing tournament:", t.name);
const toggleFavorite = (t: Tournament) => (t.isFavorite = !t.isFavorite);
const viewTeam = (t: Team) => console.log("Viewing team:", t.name);
const followTeam = (t: Team) => (t.isFollowed = !t.isFollowed);
</script>
<style scoped>
/* Tabs */
.v-tabs {
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
}

.v-tab {
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: #fff;
  transition: background 0.3s ease;
}

.v-tab:hover {
  background: rgba(255, 255, 255, 0.08);
}

/* Glass card effect (from old version) */
.glass-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px);
  color: white;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin: 20px 0 20px 20px;
}

.glass-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
}

/* Tournament */
.tournament-card {
  overflow: hidden;
  margin: 20px 0px 10px 20px;
}

.tournament-image {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.tournament-overlay {
  position: absolute;
  top: 12px;
  right: 12px;
}

.tournament-status {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #fff;
  text-transform: uppercase;
}

.tournament-status.live {
  background: #e53935;
}
.tournament-status.upcoming {
  background: #fb8c00;
}
.tournament-status.completed {
  background: #43a047;
}

.tournament-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
}

.tournament-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.info-row {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  opacity: 0.85;
}

/* Teams */
.team-card {
  overflow: hidden;
  margin: 20px 0 20px 20px;
}

.team-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
}

.team-details {
  flex: 1;
  margin-left: 12px;
}

.team-name {
  font-weight: 600;
  font-size: 1rem;
  color: #fff;
}

.team-region {
  font-size: 0.85rem;
  opacity: 0.7;
}

.team-rank {
  font-size: 1rem;
  font-weight: bold;
  color: #2196f3;
}

.team-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
  padding: 12px;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
}

/* Schedule */
.schedule-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.schedule-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: background 0.2s ease;
}

.schedule-item:hover {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.match-time {
  text-align: center;
  min-width: 70px;
}

.match-time .date {
  font-weight: bold;
  color: #fff;
}

.match-time .time {
  font-size: 0.85rem;
  opacity: 0.8;
}

.match-info {
  flex: 1;
  padding: 0 12px;
}

.tournament-info {
  font-size: 0.85rem;
  opacity: 0.7;
}

.teams-info {
  display: flex;
  align-items: center;
  gap: 6px;
}

.vs {
  margin: 0 8px;
  font-weight: bold;
  opacity: 0.8;
}

/* Leaderboard */
.leaderboard-list {
  display: flex;
  flex-direction: column;

  gap: 12px;
}

.leaderboard-item {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-radius: 8px;
  transition: background 0.2s ease;
}

.leaderboard-item:hover {
  background: rgba(255, 255, 255, 0.08);
}

.rank {
  font-weight: bold;
  font-size: 1rem;
  margin-right: 10px;
  min-width: 30px;
  text-align: center;
}

.rank-gold {
  color: gold;
}

.rank-silver {
  color: silver;
}

.rank-bronze {
  color: #cd7f32;
}

.team-info {
  flex: 1;
  margin-left: 10px;
  color: #fff;
}

.team-stats {
  display: flex;
  gap: 12px;
}

.stat .label {
  font-size: 0.75rem;
  opacity: 0.7;
}

.stat .value {
  font-weight: bold;
  margin-left: 10px;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .team-stats {
    grid-template-columns: 1fr;
  }

  .schedule-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .leaderboard-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .tournament-title {
    font-size: 1rem;
  }

  .team-name {
    font-size: 0.9rem;
  }

  .stat-row {
    font-size: 0.8rem;
  }

  .match-time {
    font-size: 0.8rem;
  }
}
</style>
