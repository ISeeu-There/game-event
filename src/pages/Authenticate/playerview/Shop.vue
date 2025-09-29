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

      <!-- Shop Container -->
      <v-container fluid class="shop-container">
        <!-- Hero Section -->
        <div class="hero-section">
          <div class="hero-content">
            <div class="hero-badge">
              <v-icon class="mr-2">mdi-shopping</v-icon>
              GAMING STORE
            </div>
            <h1 class="hero-title">
              Premium <span class="gradient-text">Arsenal</span>
            </h1>
            <p class="hero-subtitle">
              Gear up with legendary weapons, skins, and exclusive items
            </p>
            <div class="hero-stats">
              <div class="stat-item">
                <div class="stat-number">
                  {{ totalItems.toLocaleString() }}+
                </div>
                <div class="stat-label">Items Available</div>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <div class="stat-number">{{ dailyDeals }}</div>
                <div class="stat-label">Daily Deals</div>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <div class="stat-number">
                  {{ userCredits.toLocaleString() }}
                </div>
                <div class="stat-label">Your Credits</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Filters -->
        <v-row class="mb-6 filter-bar" align="center">
          <v-col cols="12" md="3">
            <v-text-field
              v-model="searchQuery"
              label="Search items..."
              prepend-inner-icon="mdi-magnify"
              dense
              outlined
              hide-details
              class="glass-input"
            />
          </v-col>
          <v-col cols="6" md="3">
            <v-select
              v-model="selectedCategory"
              :items="categories"
              label="Category"
              dense
              outlined
              hide-details
              class="glass-input"
            />
          </v-col>
          <v-col cols="6" md="3">
            <v-select
              v-model="selectedRarity"
              :items="rarities"
              label="Rarity"
              dense
              outlined
              hide-details
              class="glass-input"
            />
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              v-model="sortBy"
              :items="sortOptions"
              label="Sort By"
              dense
              outlined
              hide-details
              class="glass-input"
            />
          </v-col>
        </v-row>

        <!-- Items Grid -->
        <v-row>
          <v-col
            v-for="item in paginatedItems"
            :key="item.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card class="item-card glass-card">
              <v-img :src="item.image" height="200" class="item-image">
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular indeterminate color="primary" />
                  </v-row>
                </template>
                <div
                  v-if="item.rarity"
                  class="rarity-badge"
                  :class="`rarity-${item.rarity.toLowerCase()}`"
                >
                  {{ item.rarity }}
                </div>
              </v-img>
              <v-card-title class="item-title">{{ item.name }}</v-card-title>
              <v-card-subtitle class="item-subtitle">{{
                item.category
              }}</v-card-subtitle>
              <v-card-text class="item-description">{{
                item.description
              }}</v-card-text>
              <v-card-actions class="item-actions">
                <div class="price">
                  {{ item.price.toLocaleString() }} Credits
                </div>
                <v-spacer />
                <v-btn color="primary" @click="addToCart(item)">Add</v-btn>
                <v-btn icon @click="viewItem(item)">
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <!-- Pagination -->
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          circle
          class="my-6"
        />
      </v-container>
    </div>

    <!-- Cart Drawer -->
    <v-navigation-drawer
      v-model="cartDrawer"
      location="right"
      temporary
      width="400"
      class="glass-drawer"
    >
      <v-toolbar flat>
        <v-toolbar-title>Shopping Cart</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="cartDrawer = false"
          ><v-icon>mdi-close</v-icon></v-btn
        >
      </v-toolbar>
      <v-divider />
      <v-list>
        <v-list-item v-for="(item, i) in cartItems" :key="i">
          <template v-slot:prepend>
            <v-avatar><v-img :src="item.image" /></v-avatar>
          </template>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle
            >{{ item.price.toLocaleString() }} Credits</v-list-item-subtitle
          >
          <template v-slot:append>
            <v-btn icon color="error" @click="removeFromCart(i)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-card-text class="total-section">
        <div class="total-label">Total:</div>
        <div class="total-amount">{{ cartTotal.toLocaleString() }} Credits</div>
      </v-card-text>
      <v-card-actions>
        <v-btn block color="success" @click="checkout">Checkout</v-btn>
      </v-card-actions>
    </v-navigation-drawer>

    <!-- Item Modal -->
    <v-dialog v-model="itemDialog" max-width="600px">
      <v-card v-if="selectedItem" class="glass-card">
        <v-img :src="selectedItem.image" height="300" />
        <v-card-title>{{ selectedItem.name }}</v-card-title>
        <v-card-subtitle
          >{{ selectedItem.category }} •
          {{ selectedItem.rarity }}</v-card-subtitle
        >
        <v-card-text>
          <p>{{ selectedItem.description }}</p>
          <div class="price-detail">
            {{ selectedItem.price.toLocaleString() }} Credits
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="addToCart(selectedItem)"
            >Add to Cart</v-btn
          >
          <v-spacer />
          <v-btn text @click="itemDialog = false">Close</v-btn>
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

// Item interface
interface ShopItem {
  id: number;
  name: string;
  category: "Coins" | "Skin";
  rarity?: "Common" | "Rare" | "Epic" | "Legendary";
  price: number; // in Credits
  description: string;
  image: string;
}

// Shop Items
const items = ref<ShopItem[]>([
  // Coins
  {
    id: 1,
    name: "150 Coins Pack",
    category: "Coins",
    price: 10000, // 100$ = 10000 credits
    description: "Get 150 coins to use across all your games.",
    image: "https://picsum.photos/400/300?random=10",
  },
  {
    id: 2,
    name: "500 Coins Pack",
    category: "Coins",
    price: 30000,
    description: "Big pack with 500 coins – best value.",
    image: "https://picsum.photos/400/300?random=11",
  },

  // Skins
  {
    id: 3,
    name: "Steel Armor",
    category: "Skin",
    rarity: "Common",
    price: 500,
    description: "Basic protective armor skin.",
    image: "https://picsum.photos/400/300?random=12",
  },
  {
    id: 4,
    name: "Dragonfire Blade",
    category: "Skin",
    rarity: "Rare",
    price: 2000,
    description: "A blade forged with dragonfire.",
    image: "https://picsum.photos/400/300?random=13",
  },
  {
    id: 5,
    name: "Shadow Phantom",
    category: "Skin",
    rarity: "Epic",
    price: 5000,
    description: "Move like a shadow with this epic skin.",
    image: "https://picsum.photos/400/300?random=14",
  },
  {
    id: 6,
    name: "Celestial Phoenix",
    category: "Skin",
    rarity: "Legendary",
    price: 12000,
    description: "A legendary phoenix reborn in flames.",
    image: "https://picsum.photos/400/300?random=15",
  },
]);

// Filters
const searchQuery = ref("");
const selectedCategory = ref<"" | "Coins" | "Skin">("");
const selectedRarity = ref<"" | "Common" | "Rare" | "Epic" | "Legendary">("");
const sortBy = ref("Price: Low to High");

const categories = ["Coins", "Skin"];
const rarities = ["Common", "Rare", "Epic", "Legendary"];
const sortOptions = [
  "Price: Low to High",
  "Price: High to Low",
  "Name A-Z",
  "Name Z-A",
];

// Computed
const filteredItems = computed(() => {
  let result = items.value;

  if (searchQuery.value) {
    result = result.filter((i) =>
      i.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  if (selectedCategory.value) {
    result = result.filter((i) => i.category === selectedCategory.value);
  }

  if (selectedRarity.value && selectedCategory.value === "Skin") {
    result = result.filter((i) => i.rarity === selectedRarity.value);
  }

  switch (sortBy.value) {
    case "Price: Low to High":
      result = [...result].sort((a, b) => a.price - b.price);
      break;
    case "Price: High to Low":
      result = [...result].sort((a, b) => b.price - a.price);
      break;
    case "Name A-Z":
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "Name Z-A":
      result = [...result].sort((a, b) => b.name.localeCompare(a.name));
      break;
  }

  return result;
});

// Pagination
const currentPage = ref(1);
const itemsPerPage = 8;
const totalPages = computed(() =>
  Math.ceil(filteredItems.value.length / itemsPerPage)
);
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredItems.value.slice(start, start + itemsPerPage);
});

// Cart
const cartDrawer = ref(false);
const cartItems = ref<ShopItem[]>([]);
const addToCart = (item: ShopItem) => cartItems.value.push(item);
const removeFromCart = (index: number) => cartItems.value.splice(index, 1);
const cartTotal = computed(() =>
  cartItems.value.reduce((s, i) => s + i.price, 0)
);
const checkout = () => {
  alert("Checkout successful!");
  cartItems.value = [];
  cartDrawer.value = false;
};

// Item Dialog
const itemDialog = ref(false);
const selectedItem = ref<ShopItem | null>(null);
const viewItem = (item: ShopItem) => {
  selectedItem.value = item;
  itemDialog.value = true;
};

// Stats
const totalItems = computed(() => items.value.length);
const dailyDeals = 5;
const userCredits = 12000;
</script>

<style scoped>
/* Base Styles - Inherited from leaderboard */
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

.shop-container {
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

/* Controls Section */
.controls-card {
  background: rgba(26, 29, 35, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.filters-row {
  display: flex;
  gap: 1.5rem;
  align-items: end;
  flex-wrap: wrap;
}

.filter-group,
.search-group {
  flex: 1;
  min-width: 200px;
}

.cart-section {
  margin-left: auto;
}

.filter-label {
  display: block;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.cart-btn {
  position: relative;
}

/* Glass Card Effect */
.glass-card {
  background: rgba(26, 29, 35, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
}

/* Section Headers */
.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-subtitle {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.7);
}

/* Featured Items */
.featured-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.featured-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.item-card {
  position: relative;
  padding: 1.5rem;
  border-radius: 20px;
  transition: all 0.3s ease;
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
  transform: translateY(30px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.item-image-wrapper {
  position: relative;
  margin-bottom: 1rem;
  border-radius: 12px;
  overflow: hidden;
}

.item-image {
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.item-card:hover .item-image {
  transform: scale(1.05);
}

.rarity-glow {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: 14px;
  z-index: -1;
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.item-card:hover .rarity-glow {
  opacity: 1;
}

.glow-common {
  background: linear-gradient(45deg, #9e9e9e, #757575);
}

.glow-rare {
  background: linear-gradient(45deg, #2196f3, #1976d2);
}

.glow-epic {
  background: linear-gradient(45deg, #9c27b0, #7b1fa2);
}

.glow-legendary {
  background: linear-gradient(45deg, #ff9800, #f57c00);
}

.glow-mythic {
  background: linear-gradient(45deg, #f44336, #d32f2f, #ff9800, #ffd700);
  background-size: 200% 200%;
  animation: mythicGlow 2s ease-in-out infinite alternate;
}

@keyframes mythicGlow {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

.item-badge {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  background: rgba(33, 150, 243, 0.9);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 2;
}

.sale-badge {
  background: rgba(244, 67, 54, 0.9);
  left: auto;
  right: 0.5rem;
}

.item-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 12px;
}

.item-image-wrapper:hover .item-overlay {
  opacity: 1;
}

.item-info {
  text-align: center;
}

.item-rarity {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  display: inline-block;
  margin-bottom: 0.5rem;
}

.rarity-common {
  background: rgba(158, 158, 158, 0.2);
  color: #9e9e9e;
}

.rarity-rare {
  background: rgba(33, 150, 243, 0.2);
  color: #2196f3;
}

.rarity-epic {
  background: rgba(156, 39, 176, 0.2);
  color: #9c27b0;
}

.rarity-legendary {
  background: rgba(255, 152, 0, 0.2);
  color: #ff9800;
}

.rarity-mythic {
  background: linear-gradient(
    135deg,
    rgba(244, 67, 54, 0.2),
    rgba(255, 215, 0, 0.2)
  );
  color: #ffd700;
}

.item-name {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #ffffff;
}

.item-description {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1rem;
  line-height: 1.4;
}

.item-stats {
  margin-bottom: 1rem;
}

.stat-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.stat-name {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  min-width: 60px;
}

.stat-bar {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stat-value {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.9);
  min-width: 30px;
}

.item-price {
  margin-top: auto;
}

.price-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.original-price {
  color: rgba(255, 255, 255, 0.5);
  text-decoration: line-through;
  font-size: 0.875rem;
}

.current-price {
  color: #ffd700;
  font-weight: 700;
  font-size: 1.125rem;
}

.currency-icon {
  margin-left: 0.25rem;
}

/* Items Grid */
.items-card {
  background: rgba(26, 29, 35, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.items-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem 2rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 600;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

.items-list {
  padding: 1rem;
}

.item-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 12px;
  transition: background 0.2s ease;
  cursor: pointer;
}

.item-row:hover {
  background: rgba(255, 255, 255, 0.05);
}

.item-image-small {
  border-radius: 8px;
  overflow: hidden;
}

.item-details {
  flex: 1;
}

.item-details .item-name {
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

/* Shopping Cart */
.cart-drawer {
  background: rgba(26, 29, 35, 0.95);
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.cart-title {
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.cart-content {
  flex: 1;
  padding: 1rem;
}

.empty-cart {
  text-align: center;
  padding: 3rem 1rem;
  color: rgba(255, 255, 255, 0.6);
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.cart-item-image {
  border-radius: 8px;
  overflow: hidden;
}

.cart-item-details {
  flex: 1;
}

.cart-item-name {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.cart-item-price {
  color: #ffd700;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.cart-summary {
  margin-top: 1rem;
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.total-amount {
  color: #ffd700;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.checkout-btn {
  margin-top: 1rem;
}

/* Item Modal */
.item-modal {
  border-radius: 16px;
  background: rgba(26, 29, 35, 0.95);
  backdrop-filter: blur(20px);
}

.modal-header {
  position: relative;
  height: 200px;
  overflow: hidden;
  border-radius: 16px 16px 0 0;
}

.modal-image {
  width: 100%;
  height: 100%;
}

.modal-content {
  padding: 2rem;
}

.item-header {
  text-align: center;
  margin-bottom: 2rem;
}

.item-header .item-name {
  font-size: 2rem;
  margin: 1rem 0;
}

.stats-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #ffffff;
}

.stats-grid {
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;
}

.stats-grid .stat-item {
  display: grid;
  grid-template-columns: 100px 1fr 50px;
  align-items: center;
  gap: 1rem;
}

.item-price-section {
  text-align: center;
  margin-top: 2rem;
}

.price-display {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 1.5rem;
}

.modal-actions {
  padding: 1rem 2rem 2rem;
}

/* Pagination */
.pagination-section {
  padding: 2rem;
  text-align: center;
}

.custom-pagination .v-pagination__item {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  margin: 0 0.25rem;
}

.custom-pagination .v-pagination__item--is-active {
  background: rgba(33, 150, 243, 0.8);
  border-color: #2196f3;
}

/* RESPONSIVE DESIGN */
@media (max-width: 1200px) {
  .items-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 992px) {
  .main-content {
    margin-left: 0;
  }

  .sidebar {
    transform: translateX(-100%);
  }

  .sidebar.active {
    transform: translateX(0);
  }

  .filters-row {
    flex-direction: column;
    align-items: stretch;
  }

  .cart-section {
    margin-left: 0;
    margin-top: 1rem;
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

  .items-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    padding: 1rem;
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

  .items-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .item-card {
    padding: 1rem;
  }

  .filters-row {
    gap: 1rem;
  }

  .filter-group,
  .search-group {
    min-width: auto;
  }

  .cart-drawer {
    width: 100vw;
  }

  .modal-content {
    padding: 1rem;
  }

  .stats-grid .stat-item {
    grid-template-columns: 80px 1fr 40px;
    gap: 0.5rem;
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

.v-btn-toggle .v-btn {
  background-color: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

.v-btn-toggle .v-btn--active {
  background-color: rgba(33, 150, 243, 0.8) !important;
  border-color: #2196f3 !important;
}
</style>
