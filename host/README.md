# SSR Hydration Rsbuild Host Vue

## Setup

To get started, install the required dependencies:

```bash
pnpm install
```

Before starting the host application please start the `rsbuild_ssr_hydration_remote_vue` so the remotes are properly shown in this host application.

## Development

Run the following command to build the remote application in dev mode:

```bash
pnpm dev
```

This will generate the `mf-manifest.json` and `remoteEntry.js` files, and serve the fully SSR-hydrated Rsbuild remote application with hmr.
