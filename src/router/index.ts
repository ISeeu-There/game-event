import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import Home from "../pages/Home.vue";
import Events from "../pages/Events.vue";
import Contact from "../pages/Contact.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", component: Home },
  { path: "/events", component: Events },
  { path: "/contact", component: Contact },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
