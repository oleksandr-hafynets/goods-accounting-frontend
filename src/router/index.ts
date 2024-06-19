import { createRouter, createWebHistory } from "vue-router";
import { authStore } from "../store/authStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:pathMatch(.*)",
      name: "404",
      component: () => import("../views/404Page.vue"),
    },
    {
      path: "/",
      name: "home",
      component: () => import("../views/MainPage.vue"),
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: () => import("../views/SignUpPage.vue"),
    },
    {
      path: "/sign-in",
      name: "sign-in",
      component: () => import("../views/SignInPage.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const store = authStore();

  try {
    await store.check();
    if (to.name === "home" || to.name === "404") {
      next();
    } else {
      next("/");
    }
  } catch {
    if (to.name === "sign-in" || to.name === "sign-up" || to.name === "404") {
      next();
    } else {
      next("/sign-in");
    }
  }
});

export default router;
