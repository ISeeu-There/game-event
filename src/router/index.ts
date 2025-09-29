import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { onAuthStateChanged } from "firebase/auth";

import { requireAuth } from "../plugines/auth";
import Home from "../pages/Authenticate/playerview/Home.vue";
import { components } from "vuetify/dist/vuetify.js";
import Membership from "../pages/Authenticate/playerview/Membership.vue";
import Settings from "../pages/Authenticate/playerview/Settings.vue";
import Tournaments from "../pages/Authenticate/playerview/Tournaments.vue";
import Leaderboards from "../pages/Authenticate/playerview/Leaderboards.vue";
import Esports from "../pages/Authenticate/playerview/Esports.vue";
import Shop from "../pages/Authenticate/playerview/Shop.vue";
import Login from "../pages/Anonymous/Login.vue";
import Register from "../pages/Anonymous/Register.vue";
import EmailOTP from "../pages/Anonymous/RegisterElement/EmailOTP.vue";
import { auth } from "../plugines/firebase";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("../pages/Anonymous.vue"),
    children: [
      {
        path: "",
        component: Login,
      },
      {
        path: "register",
        component: Register,
      },
      {
        path: "verify-email",
        name: "verify",
        component: EmailOTP,
      },
    ],
  },
  {
    path: "/u",
    component: () => import("../pages/Authenticate.vue"),
    children: [
      { path: "dashboard", name: "home", component: Home },
      { path: "Membership", component: Membership },
      { path: "Setting", component: Settings },
      { path: "Tournament", component: Tournaments },
      { path: "Leaderboard", component: Leaderboards },
      { path: "Esport", component: Esports },
      { path: "Shop", component: Shop },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.path.startsWith("/u")) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        next(); // user is logged in
      } else {
        next({ path: "/" }); // redirect to login
      }
    });
  } else {
    next(); // public routes
  }
});

export default router;
