import { createApp } from "vue";
import router from "./router";
import PrimeVue from "primevue/config";
import { createPinia } from "pinia";
import { initializeApp } from "firebase/app";

import App from "./App.vue";
import "./assets/css/reset.css";
import "primeflex/primeflex.css";
import "primevue/resources/themes/aura-light-green/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
const app = createApp(App);
const pinia = createPinia();

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
  measurementId: import.meta.env.VIRE_MEASUREMENTID,
};

initializeApp(firebaseConfig);

app.use(router).use(PrimeVue).use(pinia).mount("#app");
