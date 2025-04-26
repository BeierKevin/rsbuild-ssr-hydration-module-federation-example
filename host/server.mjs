import express from "express";
import { createRsbuild, loadConfig, logger } from "@rsbuild/core";

const serverRender = (serverAPI) => async (_req, res) => {
  try {
    const indexModule = await serverAPI.environments.ssr.loadBundle("index");
    const result = await indexModule.render();
    const template = await serverAPI.environments.web.getTransformedHtml(
      "index"
    );

    const html = template.replace(
      '<div id="app"><!--app-content--></div>',
      `<div id="app">${result.appHtml}</div>`
    );

    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.send(html);
  } catch (error) {
    console.error("Server Render Error:", error);
    res.status(500).send("Server Error");
  }
};

export async function startDevServer() {
  const { content } = await loadConfig({});

  // Init Rsbuild
  const rsbuild = await createRsbuild({
    rsbuildConfig: content,
  });

  const app = express();

  // Serve static files
  app.use("/client", express.static("dist/client"));
  app.use("/server", express.static("dist/server"));

  // Create Rsbuild DevServer instance
  const rsbuildServer = await rsbuild.createDevServer();
  const serverRenderMiddleware = serverRender(rsbuildServer);

  app.get("/", async (req, res, next) => {
    try {
      await serverRenderMiddleware(req, res, next);
    } catch (err) {
      logger.error("SSR render error, downgrade to CSR...\n", err);
      next();
    }
  });

  // Apply Rsbuild’s built-in middlewares
  app.use(rsbuildServer.middlewares);

  const httpServer = app.listen(rsbuildServer.port, async () => {
    // Notify Rsbuild that the custom server has started
    await rsbuildServer.afterListen();
    console.log(`Server läuft auf Port ${rsbuildServer.port}`);
  });

  rsbuildServer.connectWebSocket({ server: httpServer });

  return {
    close: async () => {
      await rsbuildServer.close();
      httpServer.close();
    },
  };
}

startDevServer();
