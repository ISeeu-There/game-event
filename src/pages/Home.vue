<template>
  <div class="gaming-platform">
    <!-- Sidebar -->
    <div class="sidebar" :class="{ active: isSidebarOpen }">
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

      <!-- Navigation Menu -->
      <nav class="sidebar-nav">
        <div class="nav-section">
          <div class="nav-item active">
            <v-icon size="20" color="#FFFFFF">mdi-view-dashboard</v-icon>
            <span>Dashboard</span>
          </div>
        </div>

        <div class="nav-section">
          <div class="section-title">NAVIGATION</div>
          <div class="nav-item">
            <v-icon size="20" color="#8E9297">mdi-trophy</v-icon>
            <span>Tournaments</span>
            <div class="nav-badge">32</div>
          </div>
          <div class="nav-item">
            <v-icon size="20" color="#8E9297">mdi-gamepad-variant</v-icon>
            <span>My Games</span>
          </div>
          <div class="nav-item">
            <v-icon size="20" color="#8E9297">mdi-shopping</v-icon>
            <span>Shop</span>
          </div>
          <div class="nav-item">
            <v-icon size="20" color="#8E9297">mdi-chart-line</v-icon>
            <span>Leaderboards</span>
          </div>
        </div>

        <div class="nav-section">
          <div class="section-title">COMMUNITY</div>
          <div class="nav-item">
            <v-icon size="20" color="#8E9297">mdi-account-group</v-icon>
            <span>Esports</span>
          </div>
          <div class="nav-item">
            <v-icon size="20" color="#8E9297">mdi-cog</v-icon>
            <span>Settings</span>
          </div>
          <div class="nav-item">
            <v-icon size="20" color="#8E9297">mdi-account-multiple</v-icon>
            <span>Membership</span>
          </div>
        </div>
      </nav>

      <!-- Bottom Section -->
      <div class="sidebar-bottom">
        <v-btn class="premium-btn" size="small" color="#00D4AA" variant="flat">
          Get Started
        </v-btn>
      </div>
    </div>
    <!-- Overlay (only visible when open) -->
    <transition name="fade">
      <div v-if="isSidebarOpen" class="overlay" @click="toggleSidebar"></div>
    </transition>
    <!-- Background Section -->
    <div class="fixed-bg-video">
      <video autoplay muted loop playsinline class="bg-video">
        <source src="../assets/bg.mp4" type="video/mp4" />
      </video>
      <div class="video-overlay"></div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Top Navigation -->
      <div class="top-nav">
        <!-- Hamburger for mobile -->
        <v-btn
          icon
          variant="text"
          class="sidebar-toggle"
          @click="toggleSidebar"
        >
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

      <!-- Game Header -->
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

      <!-- Featured Tournaments -->
      <div class="tournaments-section">
        <h2 class="section-title">FEATURED TOURNAMENTS</h2>
        <p class="section-subtitle">
          Participate in tournaments and earn prizes
        </p>

        <div class="tournaments-grid">
          <div
            class="tournament-card"
            v-for="(tournament, index) in featuredTournaments"
            :key="index"
          >
            <div class="tournament-image">
              <img :src="tournament.image" :alt="tournament.title" />
              <div
                class="tournament-status"
                :class="tournament.status.toLowerCase()"
              >
                {{ tournament.status }}
              </div>
            </div>

            <div class="tournament-content">
              <h3 class="tournament-title">{{ tournament.title }}</h3>
              <p class="tournament-description">
                {{ tournament.description }}
              </p>

              <div class="tournament-meta">
                <div class="tournament-prize">
                  <span class="prize-amount">${{ tournament.prize }}</span>
                  <v-btn
                    class="join-btn"
                    size="small"
                    :color="tournament.buttonColor"
                    variant="flat"
                  >
                    {{ tournament.jointournament }}
                  </v-btn>
                </div>
              </div>

              <div class="tournament-participants">
                <div class="participant-avatars">
                  <v-avatar
                    v-for="n in 4"
                    :key="n"
                    size="24"
                    class="participant-avatar"
                    :class="{ 'avatar-overlap': n > 1 }"
                  >
                    <!-- <v-img
                      :src="`https://via.placeholder.com/24x24/${
                        tournament.avatarColors[n - 1]
                      }/FFFFFF?text=${n}`"
                    /> -->
                  </v-avatar>
                </div>
                <span class="participant-count"
                  >{{ tournament.participants }} others</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Upcoming -->
      <div class="upcoming-section">
        <div class="section-header">
          <h2 class="section-title">UPCOMING</h2>
          <div class="section-controls">
            <v-icon size="20" color="#8E9297">mdi-chevron-left</v-icon>
            <v-icon size="20" color="#8E9297">mdi-chevron-right</v-icon>
          </div>
        </div>
        <p class="section-subtitle">Discover the upcoming competitions</p>

        <div class="upcoming-events">
          <div
            class="event-card"
            v-for="(event, index) in upcomingEvents"
            :key="index"
          >
            <div class="event-image">
              <img :src="event.image" :alt="event.title" />
            </div>
            <div class="event-info">
              <h4 class="event-title">{{ event.title }}</h4>
              <p class="event-date">{{ event.date }}</p>
              <div class="event-participants">
                <span class="participant-count"
                  >{{ event.participants }} participants</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import lol from "../assets/league.jpg";
import fortnite from "../assets/fortnite.jpg";
import live from "../assets/live.jpg";
import war from "../assets/war.jpg";

const isSidebarOpen = ref(false);
function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}

const featuredTournaments = ref([
  {
    title: "Go Live Tournament",
    description:
      "Compete with your friends in this winner-take-all tournament.",
    prize: "1,500",
    status: "LIVE",
    buttonColor: "#FF6B35",
    image: live,
    participants: "127,2k",
    avatarColors: ["FF6B6B", "4ECDC4", "45B7D1", "96CEB4"],
    jointournament: "Go Live",
  },
  {
    title: "League Of Legends Tournaments",
    description: "One more recent to running again and well get started...",
    prize: "2,800",
    status: "STARTING",
    buttonColor: "#4ECDC4",
    image: lol,
    participants: "89,1k",
    avatarColors: ["4ECDC4", "FFD93D", "FF6B6B", "45B7D1"],
    jointournament: "Join Now",
  },
  {
    title: "Fortnite Epic Challenge",
    description:
      "The epic edition of events gives you the ultimate gaming experience.",
    prize: "5,200",
    status: "UPCOMING",
    buttonColor: "#8B5CF6",
    image: fortnite,
    participants: "156,8k",
    avatarColors: ["8B5CF6", "FF6B6B", "4ECDC4", "FFD93D"],
    jointournament: "Join Now",
  },
  {
    title: "Guns N Glory Championship",
    description:
      "Manage your crew all in guns blazers-kingdom with this epic tournament.",
    prize: "7,800",
    status: "FEATURED",
    buttonColor: "#FFD93D",
    image: war,
    participants: "234,5k",
    avatarColors: ["FFD93D", "8B5CF6", "FF6B6B", "4ECDC4"],
    jointournament: "Soon",
  },
]);

const upcomingEvents = ref([
  {
    title: "CS2 Major Championship",
    date: "Sept 15, 2024",
    participants: "2,400",
    image:
      "https://www.dexerto.com/cdn-image/wp-content/uploads/2022/11/16/major-winners-champions.jpg",
  },
  {
    title: "League of Legends Worlds",
    date: "Sept 20, 2024",
    participants: "15,600",
    image:
      "https://cdn.sanity.io/images/zoz4y99f/production/13ce689b9954f0401c6367f8829963fed9efdfd6-1600x900.jpg?w=1600&auto=format",
  },
]);
</script>
<style scoped>
.gaming-platform {
  display: flex;
  min-height: 100vh;
  background: #0f0f0f;
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

.sidebar-header {
  padding: 16px;
  border-bottom: 1px solid #2c3036;
}
.sidebar-toggle {
  display: none;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 900;
  transition: 0.1;
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

/* Navigation Styles */
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
  width: 100%;
  font-weight: 10;
  text-transform: none;
  letter-spacing: 0;
}

/* Main Content Styles */
.main-content {
  flex: 1;
  margin-left: 240px;
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1d23 100%);
}

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

/* Featured Game Section */
.featured-game {
  padding: 300px 24px;
  position: relative;
  overflow: hidden;
}
/* Fixed Background Video */
.fixed-bg-video {
  position: fixed;
  top: 0;
  left: 100px;
  width: 100%;
  height: 100vh;
  z-index: 0;
  overflow: hidden;
}

.bg-video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
  transform: translate(-50%, -50%);
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3); /* Optional: add dark overlay */
  z-index: 1;
}

.main-content {
  flex: 1;
  margin-left: 240px;
  background: transparent;
  position: relative;
  z-index: 2;
}

.tournaments-section {
  padding: 32px 24px;
  background: rgba(15, 15, 15, 0.95);
  backdrop-filter: blur(10px);
}

.upcoming-section {
  padding: 32px 24px;
  background: rgba(26, 29, 35, 0.95);
  backdrop-filter: blur(10px);
}
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

.game-badges {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.age-rating,
.platform-badge {
  background: rgba(0, 0, 0, 0.3);
  color: #ffffff;
  font-size: 12px;
  font-weight: 10;
  padding: 4px 8px;
  border-radius: 4px;
  text-transform: uppercase;
}

.game-title {
  font-size: 36px;
  font-weight: 10;
  color: #ffffff;
  line-height: 1.1;
  margin: 0 0 8px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.959);
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
  font-weight: 10;
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
.stat-card:hover {
  background-color: #00d4aa;
}
.winrate-card {
  background: linear-gradient(135deg, #1f3a2e, #2d5a3f);
  max-width: 200px;
  height: 80px;
}

.winrate-number {
  font-size: 22px;
  font-weight: 10;
  color: #00ff88;
}
.stat-number {
  font-size: 24px;
  font-weight: 10;
}

.stat-label {
  font-size: 14px;
  opacity: 0.8;
}

.level-card {
  background: linear-gradient(135deg, #2d1f3d, #4b2a63);
}

.level-number {
  font-size: 22px;
  font-weight: bold;
  color: #ffd700;
}

.game-character {
  position: relative;
}

.character-showcase {
  position: relative;
}

.character-showcase img {
  width: 300px;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
}

.level-badge {
  position: absolute;
  bottom: 16px;
  right: 16px;
  background: rgba(0, 0, 0, 0.8);
  color: #ffffff;
  padding: 8px 12px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 8px;
}

.level-number {
  font-size: 18px;
  font-weight: 10;
}

.level-icons {
  display: flex;
  gap: 4px;
}

/* Tournaments Section */
.tournaments-section {
  padding: 32px 24px;
}

.section-title {
  font-size: 24px;
  font-weight: 10;
  color: #ffffff;
  margin: 0 0 8px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.section-subtitle {
  font-size: 16px;
  color: #8e9297;
  margin: 0 0 32px 0;
}

.tournaments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.tournament-card {
  background: #1a1d23;
  border: 1px solid #2c3036;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s;
  cursor: pointer;
}

.tournament-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border-color: #5865f2;
}

.tournament-image {
  position: relative;
}

.tournament-image img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.tournament-status {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 10;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tournament-status.live {
  background: #ff4655;
  color: #ffffff;
}

.tournament-status.starting {
  background: #ffd93d;
  color: #000000;
}

.tournament-status.upcoming {
  background: #8b5cf6;
  color: #ffffff;
}

.tournament-status.featured {
  background: #00d4aa;
  color: #000000;
}

.tournament-content {
  padding: 20px;
}

.tournament-title {
  font-size: 18px;
  font-weight: 10;
  color: #ffffff;
  margin: 0 0 8px 0;
}

.tournament-description {
  font-size: 14px;
  color: #8e9297;
  line-height: 1.4;
  margin: 0 0 20px 0;
}

.tournament-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.tournament-prize {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.prize-amount {
  font-size: 20px;
  font-weight: 10;
  color: #ffffff;
}

.join-btn {
  font-size: 12px;
  font-weight: 10;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-left: 10px;
}

.tournament-participants {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.participant-avatars {
  display: flex;
}

.participant-avatar {
  border: 2px solid #1a1d23;
}

.avatar-overlap {
  margin-left: -8px;
}

.participant-count {
  font-size: 14px;
  color: #8e9297;
}

/* Upcoming Section */
.upcoming-section {
  padding: 32px 24px;
  background: #1a1d23;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.section-controls {
  display: flex;
  gap: 8px;
}

.upcoming-events {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  padding: 16px 0;
}

.event-card {
  min-width: 200px;
  background: #2c3036;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
}

.event-card:hover {
  transform: scale(1.02);
}

.event-image img {
  width: 100%;
  height: 120px;
  object-fit: cover;
}

.event-info {
  padding: 16px;
}

.event-title {
  font-size: 14px;
  font-weight: 10;
  color: #ffffff;
  margin: 0 0 4px 0;
}

.event-date {
  font-size: 12px;
  color: #8e9297;
  margin: 0 0 8px 0;
}

.event-participants .participant-count {
  font-size: 12px;
  color: #8e9297;
}

/* Responsive Design */
@media (max-width: 768px) {
  .sidebar {
    width: 200px;
    transform: translateX(-100%);
  }
  .sidebar.active {
    transform: translateX(0);
  }
  .sidebar-toggle {
    display: inline-flex; /* Vuetify btn uses flex, so inline-flex is better */
  }

  .main-content {
    margin-left: 200px;
  }

  .game-header {
    flex-direction: column;
    gap: 24px;
  }

  .tournaments-grid {
    grid-template-columns: 1fr;
  }

  .upcoming-events {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s;
  }

  .main-content {
    margin-left: 0;
  }

  .game-title {
    font-size: 24px;
  }

  .character-showcase img {
    width: 200px;
    height: 300px;
  }
}
/* Mobile Responsiveness */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: -240px;
    width: 220px;
    height: 100vh;
    transition: left 0.3s ease;
    z-index: 1000;
  }

  .sidebar.active {
    left: 0;
  }

  .main-content {
    margin-left: 0;
  }
  .fixed-bg-video {
    position: fixed;
    top: 0;
    left: -2px;
    width: 100%;
    height: 100vh;
    z-index: 0;
    overflow: hidden;
  }
  .bg-video {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 50%;
    min-height: 50%;
    object-fit: cover;
  }
  .top-nav {
    position: fixed;
    flex-wrap: wrap;
    width: 100%;
    gap: 12px;
    padding: 12px 16px;
    z-index: 500;
  }

  .nav-tabs {
    gap: 16px;
    flex: 1;
    justify-content: center;
  }

  .search-bar input {
    width: 120px;
  }

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

  .tournaments-grid {
    grid-template-columns: 1fr;
  }

  .upcoming-events {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 12px;
  }

  .event-card {
    min-width: 240px;
    flex: 0 0 auto;
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

  .game-title {
    font-size: 20px;
  }

  .stat-number {
    font-size: 20px;
  }

  .tournament-title {
    font-size: 16px;
  }
}
</style>
