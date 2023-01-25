import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register/:step?", //todo multilanguage routes
      name: "register",
      component: Register,
    },
  ],
});

router.beforeEach(() => {
  // todo scroll smoothly (animation)
  window.scrollTo(0, 0);
});

export default router;
