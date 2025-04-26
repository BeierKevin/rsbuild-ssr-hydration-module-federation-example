# SSR Hydration Rsbuild Remote Vue

## Setup

To get started, install the required dependencies:

```bash
pnpm install
```

Before starting the remote application please start the `rspack_ssr_hydration_remote_vue` so the remote is properly shown in this remote application.

## Development

Run the following command to build the remote application in dev mode:

```bash
pnpm dev
```

This will generate the `mf-manifest.json` and `remoteEntry.js` files, and serve the fully SSR-hydrated Rsbuild remote application with hmr.
