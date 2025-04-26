import { createSSRApp } from "vue";
import App from "./App.vue";

export async function createApp() {
  const app = createSSRApp(App);
  return { app };
}
