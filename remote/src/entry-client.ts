import { createApp } from "./main";

async function init() {
  const { app } = await createApp();

  app.mount("#app", true);
}

await init().catch((error) => {
  console.error("Client Initialization Error:", error);
});
