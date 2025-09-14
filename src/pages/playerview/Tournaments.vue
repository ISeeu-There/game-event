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
      <NavMenuSideBar />
    </div>

    <!-- Overlay -->
    <transition name="fade">
      <div v-if="isSidebarOpen" class="overlay" @click="toggleSidebar"></div>
    </transition>

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
          <span
            class="tab"
            :class="{ active: activeTab === 'all' }"
            @click="activeTab = 'all'"
            >All Tournaments</span
          >
          <span
            class="tab"
            :class="{ active: activeTab === 'live' }"
            @click="activeTab = 'live'"
            >Live</span
          >
          <span
            class="tab"
            :class="{ active: activeTab === 'upcoming' }"
            @click="activeTab = 'upcoming'"
            >Upcoming</span
          >
          <span
            class="tab"
            :class="{ active: activeTab === 'featured' }"
            @click="activeTab = 'featured'"
            >Featured</span
          >
        </div>

        <div class="nav-controls">
          <div class="search-bar">
            <v-icon size="16" color="#8E9297">mdi-magnify</v-icon>
            <input
              type="text"
              placeholder="Search tournaments..."
              v-model="searchQuery"
            />
          </div>
          <div class="user-controls">
            <v-icon size="20" color="#FFFFFF">mdi-bell</v-icon>
            <span class="username-display">Erik Packmans</span>
          </div>
        </div>
      </div>
      <!-- Background Section -->
      <div class="fixed-bg-video">
        <video autoplay muted loop playsinline class="bg-video">
          <source src="../../assets/tournament-bg.mp4" type="video/mp4" />
        </video>
        <div class="video-overlay"></div>
      </div>
      <!-- Tournament Header -->
      <div class="tournament-header">
        <div class="header-content">
          <h1 class="page-title">TOURNAMENTS</h1>
          <p class="page-description">
            Compete in exciting tournaments and win amazing prizes
          </p>

          <!-- Filter Bar -->
          <div class="filter-bar">
            <div class="filter-chips">
              <v-chip
                v-for="filter in filters"
                :key="filter.value"
                :class="{ active: activeFilter === filter.value }"
                @click="activeFilter = filter.value"
                class="filter-chip"
              >
                <v-icon size="16" :icon="filter.icon" class="mr-2"></v-icon>
                {{ filter.label }}
              </v-chip>
            </div>

            <div class="filter-actions">
              <v-btn variant="outlined" class="filter-btn">
                <v-icon size="16">mdi-filter-variant</v-icon>
                <span class="ml-2">Filters</span>
              </v-btn>
              <v-btn variant="outlined" class="sort-btn">
                <v-icon size="16">mdi-sort</v-icon>
                <span class="ml-2">Sort by Prize</span>
              </v-btn>
            </div>
          </div>
        </div>
      </div>

      <!-- Tournament Stats -->
      <div class="tournament-stats">
        <div class="stats-grid">
          <v-card class="stat-card" elevation="6">
            <v-card-text class="text-center">
              <div class="stat-icon">
                <v-icon size="24" color="#00D4AA">mdi-trophy</v-icon>
              </div>
              <div class="stat-number">{{ totalTournaments }}</div>
              <div class="stat-label">Active Tournaments</div>
            </v-card-text>
          </v-card>

          <v-card class="stat-card" elevation="6">
            <v-card-text class="text-center">
              <div class="stat-icon">
                <v-icon size="24" color="#FF6B35">mdi-currency-usd</v-icon>
              </div>
              <div class="stat-number">
                ${{ totalPrizePool.toLocaleString() }}
              </div>
              <div class="stat-label">Total Prize Pool</div>
            </v-card-text>
          </v-card>

          <v-card class="stat-card" elevation="6">
            <v-card-text class="text-center">
              <div class="stat-icon">
                <v-icon size="24" color="#4ECDC4">mdi-account-group</v-icon>
              </div>
              <div class="stat-number">
                {{ totalParticipants.toLocaleString() }}
              </div>
              <div class="stat-label">Total Players</div>
            </v-card-text>
          </v-card>

          <v-card class="stat-card live-card" elevation="6">
            <v-card-text class="text-center">
              <div class="stat-icon">
                <v-icon size="24" color="#FF4655">mdi-lightning-bolt</v-icon>
              </div>
              <div class="stat-number">{{ liveTournaments }}</div>
              <div class="stat-label">Live Now</div>
            </v-card-text>
          </v-card>
        </div>
      </div>

      <!-- Featured Tournament Banner -->
      <div class="featured-banner" v-if="featuredTournament">
        <div class="banner-content">
          <div class="banner-info">
            <div class="featured-badge">
              <v-icon size="16" color="#FFD93D">mdi-star</v-icon>
              <span>FEATURED</span>
            </div>
            <h2 class="featured-title">{{ featuredTournament.title }}</h2>
            <p class="featured-description">
              {{ featuredTournament.description }}
            </p>

            <div class="featured-details">
              <div class="detail-item">
                <v-icon size="16" color="#00D4AA">mdi-currency-usd</v-icon>
                <span>${{ featuredTournament.prize }}</span>
              </div>
              <div class="detail-item">
                <v-icon size="16" color="#8E9297">mdi-account-group</v-icon>
                <span
                  >{{ featuredTournament.participants }} /
                  {{ featuredTournament.maxParticipants }}</span
                >
              </div>
              <div class="detail-item">
                <v-icon size="16" color="#8E9297">mdi-clock</v-icon>
                <span>{{ featuredTournament.startDate }}</span>
              </div>
            </div>

            <v-btn
              class="featured-join-btn"
              size="large"
              color="#FF6B35"
              variant="flat"
            >
              Join Tournament
            </v-btn>
          </div>

          <div class="banner-image">
            <img
              :src="featuredTournament.image"
              :alt="featuredTournament.title"
            />
            <div class="participant-preview">
              <div class="participant-avatars">
                <v-avatar
                  v-for="n in 5"
                  :key="n"
                  size="32"
                  class="participant-avatar"
                  :class="{ 'avatar-overlap': n > 1 }"
                >
                </v-avatar>
              </div>
              <span class="participant-text"
                >+{{ featuredTournament.participants }} players</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Tournament Grid -->
      <div class="tournaments-section">
        <div class="section-header">
          <h2 class="section-title">ALL TOURNAMENTS</h2>
          <div class="section-controls">
            <span class="results-count"
              >{{ filteredTournaments.length }} tournaments found</span
            >
          </div>
        </div>

        <div class="tournaments-grid">
          <div
            class="tournament-card"
            v-for="tournament in paginatedTournaments"
            :key="tournament.id"
          >
            <div class="tournament-image">
              <img :src="tournament.image" :alt="tournament.title" />
              <div
                class="tournament-status"
                :class="tournament.status.toLowerCase()"
              >
                {{ tournament.status }}
              </div>
              <div
                class="tournament-difficulty"
                :class="tournament.difficulty.toLowerCase()"
              >
                {{ tournament.difficulty }}
              </div>
              <div v-if="tournament.featured" class="featured-star">
                <v-icon size="16" color="#FFD93D">mdi-star</v-icon>
              </div>
            </div>

            <div class="tournament-content">
              <div class="tournament-game">{{ tournament.game }}</div>
              <h3 class="tournament-title">{{ tournament.title }}</h3>
              <p class="tournament-description">{{ tournament.description }}</p>

              <div class="tournament-tags">
                <v-chip
                  v-for="tag in tournament.tags"
                  :key="tag"
                  size="small"
                  class="tournament-tag"
                >
                  {{ tag }}
                </v-chip>
              </div>

              <div class="tournament-details">
                <div class="detail-row">
                  <div class="detail-item">
                    <v-icon size="14" color="#00D4AA">mdi-currency-usd</v-icon>
                    <span class="detail-value">${{ tournament.prize }}</span>
                  </div>
                  <div class="detail-item">
                    <v-icon size="14" color="#8E9297">mdi-account-group</v-icon>
                    <span class="detail-value"
                      >{{ tournament.participants }}/{{
                        tournament.maxParticipants
                      }}</span
                    >
                  </div>
                </div>

                <div class="detail-row">
                  <div class="detail-item">
                    <v-icon size="14" color="#8E9297">mdi-calendar</v-icon>
                    <span class="detail-value">{{ tournament.startDate }}</span>
                  </div>
                  <div class="detail-item">
                    <v-icon size="14" color="#8E9297">mdi-clock</v-icon>
                    <span class="detail-value">{{ tournament.duration }}</span>
                  </div>
                </div>
              </div>

              <div class="tournament-actions">
                <div class="participants-bar">
                  <div class="progress-bg">
                    <div
                      class="progress-fill"
                      :style="{
                        width: getParticipantPercentage(tournament) + '%',
                      }"
                    ></div>
                  </div>
                  <span class="progress-text"
                    >{{ getParticipantPercentage(tournament) }}% full</span
                  >
                </div>

                <v-btn
                  class="join-btn"
                  size="small"
                  :color="getJoinButtonColor(tournament.status)"
                  variant="flat"
                  :disabled="tournament.status === 'ENDED'"
                >
                  {{ getJoinButtonText(tournament.status) }}
                </v-btn>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="pagination-section">
          <v-pagination
            v-model="currentPage"
            :length="totalPages"
            :total-visible="5"
            class="tournament-pagination"
          ></v-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import NavMenuSideBar from "../HomeElements/NavMenuSideBar.vue";

interface Tournament {
  id: number;
  title: string;
  game: string;
  description: string;
  prize: string;
  status: string;
  participants: string;
  maxParticipants: string;
  startDate: string;
  duration: string;
  difficulty: string;
  image: string;
  featured?: boolean;
  tags: string[];
}

const isSidebarOpen = ref(false);
const activeTab = ref("all");
const activeFilter = ref("all");
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = 9;

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const filters = [
  { label: "All", value: "all", icon: "mdi-view-grid" },
  {
    label: "Battle Royale",
    value: "battle-royale",
    icon: "mdi-crosshairs-gps",
  },
  { label: "MOBA", value: "moba", icon: "mdi-sword-cross" },
  { label: "FPS", value: "fps", icon: "mdi-pistol" },
  { label: "Racing", value: "racing", icon: "mdi-car-sports" },
  { label: "Strategy", value: "strategy", icon: "mdi-chess-knight" },
];

const tournaments = ref<Tournament[]>([
  {
    id: 1,
    title: "Fortnite World Championship",
    game: "Fortnite",
    description:
      "The ultimate battle royale tournament with the biggest prize pool of the year. Compete against the best players worldwide.",
    prize: "50,000",
    status: "LIVE",
    participants: "2,547",
    maxParticipants: "5,000",
    startDate: "Sept 15, 2024",
    duration: "3 days",
    difficulty: "Professional",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop",
    featured: true,
    tags: ["Battle Royale", "Cross-platform", "Solo"],
  },
  {
    id: 2,
    title: "League of Legends Championship",
    game: "League of Legends",
    description:
      "Compete in the most prestigious MOBA tournament with teams from around the world in this epic championship.",
    prize: "75,000",
    status: "STARTING",
    participants: "1,256",
    maxParticipants: "2,000",
    startDate: "Sept 18, 2024",
    duration: "5 days",
    difficulty: "Professional",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=200&fit=crop",
    featured: false,
    tags: ["MOBA", "Team", "Strategy"],
  },
  {
    id: 3,
    title: "CS2 Major Tournament",
    game: "Counter-Strike 2",
    description:
      "The most competitive FPS tournament featuring the world's best Counter-Strike teams in intense matches.",
    prize: "30,000",
    status: "UPCOMING",
    participants: "856",
    maxParticipants: "1,500",
    startDate: "Sept 25, 2024",
    duration: "4 days",
    difficulty: "Expert",
    image:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=200&fit=crop",
    featured: false,
    tags: ["FPS", "Team", "Tactical"],
  },
  {
    id: 4,
    title: "Rocket League Championship",
    game: "Rocket League",
    description:
      "High-octane car soccer tournament where precision meets speed in the ultimate vehicular sports competition.",
    prize: "25,000",
    status: "UPCOMING",
    participants: "432",
    maxParticipants: "800",
    startDate: "Oct 1, 2024",
    duration: "2 days",
    difficulty: "Intermediate",
    image:
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=200&fit=crop",
    featured: false,
    tags: ["Sports", "Team", "Racing"],
  },
  {
    id: 5,
    title: "Valorant Champions",
    game: "Valorant",
    description:
      "Tactical FPS tournament featuring the most skilled agents competing in intense 5v5 matches for glory.",
    prize: "40,000",
    status: "LIVE",
    participants: "1,123",
    maxParticipants: "2,500",
    startDate: "Sept 12, 2024",
    duration: "6 days",
    difficulty: "Professional",
    image:
      "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=400&h=200&fit=crop",
    featured: false,
    tags: ["FPS", "Tactical", "Team"],
  },
  {
    id: 6,
    title: "Apex Legends Global Series",
    game: "Apex Legends",
    description:
      "Battle royale tournament in the Outlands where legends compete for ultimate victory and massive prizes.",
    prize: "35,000",
    status: "STARTING",
    participants: "987",
    maxParticipants: "1,800",
    startDate: "Sept 20, 2024",
    duration: "3 days",
    difficulty: "Expert",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop",
    featured: false,
    tags: ["Battle Royale", "Team", "Hero Shooter"],
  },
  {
    id: 7,
    title: "FIFA 24 World Cup",
    game: "FIFA 24",
    description:
      "The ultimate football simulation tournament bringing together the world's best FIFA players for glory.",
    prize: "20,000",
    status: "UPCOMING",
    participants: "567",
    maxParticipants: "1,200",
    startDate: "Oct 5, 2024",
    duration: "3 days",
    difficulty: "Intermediate",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=200&fit=crop",
    featured: false,
    tags: ["Sports", "Solo", "Simulation"],
  },
  {
    id: 8,
    title: "Overwatch Champions Cup",
    game: "Overwatch 2",
    description:
      "Hero-based FPS tournament where teamwork and strategy determine the champions in epic 6v6 battles.",
    prize: "45,000",
    status: "UPCOMING",
    participants: "678",
    maxParticipants: "1,600",
    startDate: "Oct 10, 2024",
    duration: "4 days",
    difficulty: "Professional",
    image:
      "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400&h=200&fit=crop",
    featured: false,
    tags: ["Hero Shooter", "Team", "Objective"],
  },
  {
    id: 9,
    title: "Minecraft Building Contest",
    game: "Minecraft",
    description:
      "Creative building tournament where imagination meets skill in the ultimate block-building challenge.",
    prize: "15,000",
    status: "STARTING",
    participants: "234",
    maxParticipants: "500",
    startDate: "Sept 22, 2024",
    duration: "7 days",
    difficulty: "Beginner",
    image:
      "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=200&fit=crop",
    featured: false,
    tags: ["Creative", "Building", "Solo"],
  },
]);

const featuredTournament = computed(() =>
  tournaments.value.find((t) => t.featured)
);

const filteredTournaments = computed(() => {
  let filtered = tournaments.value;

  // Filter by active tab
  if (activeTab.value !== "all") {
    filtered = filtered.filter((t) => {
      if (activeTab.value === "live") return t.status === "LIVE";
      if (activeTab.value === "upcoming")
        return t.status === "UPCOMING" || t.status === "STARTING";
      if (activeTab.value === "featured") return t.featured;
      return true;
    });
  }

  // Filter by search query
  if (searchQuery.value) {
    filtered = filtered.filter(
      (t) =>
        t.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        t.game.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  return filtered;
});

const paginatedTournaments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredTournaments.value.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(filteredTournaments.value.length / itemsPerPage)
);

const totalTournaments = computed(() => tournaments.value.length);

const totalPrizePool = computed(() =>
  tournaments.value.reduce(
    (sum, t) => sum + parseInt(t.prize.replace(",", "")),
    0
  )
);

const totalParticipants = computed(() =>
  tournaments.value.reduce(
    (sum, t) => sum + parseInt(t.participants.replace(",", "")),
    0
  )
);

const liveTournaments = computed(
  () => tournaments.value.filter((t) => t.status === "LIVE").length
);

const getParticipantPercentage = (tournament: Tournament): number => {
  const participants = parseInt(tournament.participants.replace(",", ""));
  const maxParticipants = parseInt(tournament.maxParticipants.replace(",", ""));
  return Math.round((participants / maxParticipants) * 100);
};

const getJoinButtonColor = (status: string): string => {
  switch (status) {
    case "LIVE":
      return "#FF6B35";
    case "STARTING":
      return "#4ECDC4";
    case "UPCOMING":
      return "#8B5CF6";
    default:
      return "#8E9297";
  }
};

const getJoinButtonText = (status: string): string => {
  switch (status) {
    case "LIVE":
      return "Join Live";
    case "STARTING":
      return "Join Now";
    case "UPCOMING":
      return "Register";
    case "ENDED":
      return "Ended";
    default:
      return "Join";
  }
};
</script>

<style scoped>
/* Base styles from original component */
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
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
  font-weight: 600;
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
  font-weight: 600;
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
  font-weight: 600;
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
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0;
}

/* Fixed Background */
.fixed-bg-video {
  position: fixed;
  top: 0;
  left: 240px;
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
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

/* Main Content Styles */
.main-content {
  flex: 1;
  margin-left: 240px;
  background: transparent;
  position: relative;
  z-index: 2;
}

.top-nav {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: rgba(26, 29, 35, 0.95);
  backdrop-filter: blur(10px);
  width: 100%;
  border-bottom: 1px solid #2c3036;
  z-index: 10;
}

.nav-tabs {
  display: flex;
  gap: 32px;
}

.tab {
  font-size: 14px;
  font-weight: 600;
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
  font-weight: 600;
  color: #ffffff;
}

/* Tournament Header */
.tournament-header {
  position: relative; /* important for absolute positioning */
  padding: 60px 24px 40px;
  margin-top: 280px;
  text-align: center;
  overflow: hidden; /* clip video inside the hero section */
}

.tournament-header .fixed-bg-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}

.tournament-header .bg-video {
  position: absolute;
  padding: 50px 10px;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
  transform: translate(-50%, -50%);
}

.tournament-header .video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.tournament-header .header-content {
  position: relative;
  z-index: 2;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  font-size: 48px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 16px 0;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
}

.page-description {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 40px 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* Filter Bar */
.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  margin-top: 32px;
}

.filter-chips {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-chip {
  background: #2c3036 !important;
  color: #8e9297 !important;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-chip.active {
  background: #5865f2 !important;
  color: #ffffff !important;
  border-color: #5865f2;
}

.filter-chip:hover:not(.active) {
  background: #35393f !important;
  color: #dcddde !important;
}

.filter-actions {
  display: flex;
  gap: 12px;
}

.filter-btn,
.sort-btn {
  color: #ffffff !important;
  border-color: #2c3036 !important;
}

.filter-btn:hover,
.sort-btn:hover {
  background: #35393f !important;
  border-color: #5865f2 !important;
}

/* Tournament Stats */
.tournament-stats {
  padding: 32px 24px;
  background: rgba(26, 29, 35, 0.95);
  backdrop-filter: blur(10px);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.stat-card {
  background: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s;
  animation: float 3s ease-in-out infinite;
}

.stat-card:nth-child(1) {
  animation-delay: 0s;
}
.stat-card:nth-child(2) {
  animation-delay: 0.2s;
}
.stat-card:nth-child(3) {
  animation-delay: 0.4s;
}
.stat-card:nth-child(4) {
  animation-delay: 0.6s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.2);
}

.stat-icon {
  margin-bottom: 8px;
}

.stat-number {
  font-size: 28px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #8e9297;
  opacity: 0.9;
}

.live-card {
  background: linear-gradient(
    135deg,
    rgba(255, 70, 85, 0.1),
    rgba(255, 107, 53, 0.1)
  ) !important;
  border-color: rgba(255, 70, 85, 0.3);
}

/* Featured Tournament Banner */
.featured-banner {
  margin: 32px 24px;
  padding: 32px;
  background: linear-gradient(
    135deg,
    rgba(88, 101, 242, 0.1),
    rgba(139, 92, 246, 0.1)
  );
  border: 1px solid rgba(88, 101, 242, 0.3);
  border-radius: 16px;
  backdrop-filter: blur(10px);
}

.banner-content {
  display: flex;
  align-items: center;
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
}

.banner-info {
  flex: 1;
}

.featured-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 217, 61, 0.2);
  color: #ffd93d;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
}

.featured-title {
  font-size: 32px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 12px 0;
}

.featured-description {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 24px 0;
  line-height: 1.5;
}

.featured-details {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #ffffff;
}

.featured-join-btn {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.banner-image {
  position: relative;
  flex-shrink: 0;
}

.banner-image img {
  width: 300px;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
}

.participant-preview {
  position: absolute;
  bottom: 12px;
  left: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.8);
  padding: 8px 12px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.participant-avatars {
  display: flex;
}

.participant-avatar {
  border: 2px solid #ffffff;
}

.avatar-overlap {
  margin-left: -8px;
}

.participant-text {
  font-size: 12px;
  color: #ffffff;
  font-weight: 600;
}

/* Tournament Grid */
.tournaments-section {
  padding: 32px 24px;
  background: rgba(15, 15, 15, 0.95);
  backdrop-filter: blur(10px);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.results-count {
  font-size: 14px;
  color: #8e9297;
}

.tournaments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.tournament-card {
  background: #1a1d23;
  border: 1px solid #2c3036;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s;
  cursor: pointer;
}

.tournament-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  border-color: #5865f2;
}

.tournament-image {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.tournament-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.tournament-card:hover .tournament-image img {
  transform: scale(1.05);
}

.tournament-status {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tournament-status.live {
  background: #ff4655;
  color: #ffffff;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.tournament-status.starting {
  background: #4ecdc4;
  color: #000000;
}

.tournament-status.upcoming {
  background: #8b5cf6;
  color: #ffffff;
}

.tournament-difficulty {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: rgba(0, 0, 0, 0.7);
  color: #ffffff;
}

.tournament-difficulty.beginner {
  border-left: 3px solid #4ecdc4;
}

.tournament-difficulty.intermediate {
  border-left: 3px solid #ffd93d;
}

.tournament-difficulty.expert {
  border-left: 3px solid #ff6b35;
}

.tournament-difficulty.professional {
  border-left: 3px solid #ff4655;
}

.featured-star {
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: rgba(255, 217, 61, 0.9);
  border-radius: 50%;
  padding: 6px;
}

.tournament-content {
  padding: 20px;
}

.tournament-game {
  font-size: 12px;
  color: #8e9297;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.tournament-title {
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 8px 0;
  line-height: 1.3;
}

.tournament-description {
  font-size: 14px;
  color: #8e9297;
  line-height: 1.4;
  margin: 0 0 16px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tournament-tags {
  display: flex;
  gap: 6px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.tournament-tag {
  background: rgba(88, 101, 242, 0.1) !important;
  color: #8e9297 !important;
  border: 1px solid rgba(88, 101, 242, 0.2);
  font-size: 11px;
}

.tournament-details {
  margin-bottom: 16px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.detail-row:last-child {
  margin-bottom: 0;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
}

.detail-value {
  color: #ffffff;
  font-weight: 500;
}

.tournament-actions {
  border-top: 1px solid #2c3036;
  padding-top: 16px;
}

.participants-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.progress-bg {
  flex: 1;
  height: 4px;
  background: #2c3036;
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4ecdc4, #00d4aa);
  border-radius: 2px;
  transition: width 0.3s;
}

.progress-text {
  font-size: 12px;
  color: #8e9297;
  white-space: nowrap;
}

.join-btn {
  width: 100%;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Pagination */
.pagination-section {
  margin-top: 48px;
  display: flex;
  justify-content: center;
}

.tournament-pagination {
  margin: 0;
}

.tournament-pagination :deep(.v-pagination__item) {
  background: #2c3036;
  color: #8e9297;
  border: 1px solid #2c3036;
}

.tournament-pagination :deep(.v-pagination__item--is-active) {
  background: #5865f2;
  color: #ffffff;
  border-color: #5865f2;
}

.tournament-pagination
  :deep(.v-pagination__item:hover:not(.v-pagination__item--is-active)) {
  background: #35393f;
  color: #dcddde;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: -240px;
    width: 240px;
    height: 100vh;
    transition: left 0.3s ease;
    z-index: 1000;
  }

  .sidebar.active {
    left: 0;
  }

  .sidebar-toggle {
    display: inline-flex;
  }

  .main-content {
    margin-left: 0;
  }

  .fixed-bg-video {
    left: 0;
    margin-top: -0px;
    width: 100%;
  }

  .top-nav {
    flex-wrap: wrap;
    gap: 12px;
    padding: 12px 16px;
  }

  .nav-tabs {
    gap: 16px;
    flex: 1;
    justify-content: center;
  }

  .search-bar input {
    width: 120px;
  }

  .page-title {
    font-size: 32px;
  }

  .filter-bar {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }

  .filter-chips {
    justify-content: center;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .banner-content {
    flex-direction: column;
    text-align: center;
  }

  .banner-image img {
    width: 100%;
    max-width: 400px;
  }

  .featured-details {
    justify-content: center;
    flex-wrap: wrap;
  }

  .tournaments-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
@media (max-width: 768px) {
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

  .page-title {
    font-size: 24px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .stat-number {
    font-size: 24px;
  }

  .featured-title {
    font-size: 24px;
  }

  .tournament-title {
    font-size: 16px;
  }
}
</style>
