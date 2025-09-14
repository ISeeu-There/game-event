import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import Home from "../pages/playerview/Home.vue";
import { components } from "vuetify/dist/vuetify.js";
import Membership from "../pages/playerview/Membership.vue";
import Settings from "../pages/playerview/Settings.vue";
import Tournaments from "../pages/playerview/Tournaments.vue";
import Leaderboards from "../pages/playerview/Leaderboards.vue";
import Esports from "../pages/playerview/Esports.vue";
import Shop from "../pages/playerview/Shop.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", component: Home },
  { path: "/Membership", component: Membership },
  { path: "/Setting", component: Settings },
  { path: "/Tournament", component: Tournaments },
  { path: "/Leaderboard", component: Leaderboards },
  { path: "/Esport", component: Esports },
  { path: "/Shop", component: Shop },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
