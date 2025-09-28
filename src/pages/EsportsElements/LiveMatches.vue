<template>
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
              <!-- Team 1 -->
              <div class="team">
                <v-avatar size="40" class="team-logo">
                  <v-img :src="match.team1.logo" />
                </v-avatar>
                <div class="team-info">
                  <div class="team-name">{{ match.team1.name }}</div>
                  <div class="team-score">{{ match.team1.score }}</div>
                </div>
              </div>

              <div class="vs-divider text-green">VS</div>

              <!-- Team 2 -->
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
              <v-btn color="red" variant="outlined" @click="watchMatch(match)">
                <v-icon class="mr-2">mdi-play</v-icon>
                Watch Live
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";

// interface for matches
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

// sample data
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

// state
const streamDialog = ref(false);
const selectedMatch = ref<Match | null>(null);

// methods
const watchMatch = (match: Match) => {
  selectedMatch.value = match;
  streamDialog.value = true;
};
</script>

<style scoped>
.section-title {
  color: white;
  font-weight: 10;
}
.match-card {
  padding: 16px;
  background: rgba(255, 255, 255, 0.1);
}

.match-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.tournament-name {
  font-weight: bold;
  color: white;
  font-weight: 10;
  font-size: 14px;
}

.match-status.live {
  margin-top: 10px;
  color: red;
  font-weight: bold;
}
.match-actions {
  margin-top: 15px;
  display: flex;
  justify-self: end;
}

.match-teams {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
}

.team {
  display: flex;
  align-items: center;
  gap: 8px;
}

.team-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font-weight: 10;
}

.team-name {
  font-size: 13px;
  font-weight: 600;
}

.team-score {
  font-size: 16px;
  font-weight: bold;
}

.vs-divider {
  font-weight: bold;
  margin: 0 8px;
}
</style>
