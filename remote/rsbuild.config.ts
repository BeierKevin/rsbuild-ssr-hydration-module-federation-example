import { defineConfig } from "@rsbuild/core";
import { pluginVue } from "@rsbuild/plugin-vue";
import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";
import path from "path";

export default defineConfig({
  plugins: [
    pluginNodePolyfill({
      globals: {
        process: true,
      },
    }),
    pluginVue(),
  ],
  server: {
    port: 4001,
  },
  dev: {
    progressBar: true,
    hmr: true,
  },
  tools: {
    rspack: {
      ignoreWarnings: [
        (warning) => warning.message.includes("Can't resolve 'utf-8-validate'"),
        (warning) => warning.message.includes("Can't resolve 'bufferutil'"),
      ],
    },
  },
  resolve: {
    alias: {
      vue: path.resolve(__dirname, "./node_modules/vue"),
    },
  },
  environments: {
    web: {
      output: {
        target: "web",
        distPath: {
          root: "dist/client",
        },
        assetPrefix: "http://localhost:4001/client/",
        manifest: true,
        filenameHash: true,
        sourceMap: true,
        // cleanDistPath: true,
      },
      source: {
        entry: {
          index: "./src/entry-client",
        },
      },
      html: {
        template: "./template.html",
      },
      // You could also add the Module Federation config directly to the tools.rspack object like in the rspack ssr hydration example
      // plugins: [
      //   pluginModuleFederation({
      //     dts: false,
      //     name: "rsbuild_ssr_hydration_remote_vue",
      //     manifest: true,
      //     filename: "remoteEntry.js",
      //     exposes: {
      //       "./App": "./src/App.vue",
      //     },
      //     shared: {
      //       vue: {
      //         eager: true,
      //         singleton: true,
      //         requiredVersion: "^3.5.13",
      //       },
      //     },
      //   }),
      // ],
      tools: {
        rspack: {
          externalsType: "commonjs",
          plugins: [
            new ModuleFederationPlugin({
              dts: false,
              name: "rsbuild_ssr_hydration_remote_vue",
              manifest: true,
              filename: "remoteEntry.js",
              exposes: {
                "./App": "./src/App.vue",
              },
              shared: {
                vue: {
                  eager: true,
                  singleton: true,
                  requiredVersion: "^3.5.13",
                },
              },
            }),
          ],
        },
      },
    },
    ssr: {
      output: {
        target: "node",
        distPath: {
          root: "dist/server",
        },
        assetPrefix: "http://localhost:4001/server/",
        // cleanDistPath: true,
        manifest: true,
        filenameHash: true,
        sourceMap: true,
      },
      source: {
        entry: {
          index: "./src/entry-server",
        },
      },
      // When trying to use the native rsbuild Module Federation Plugin with SSR and hydration I always got hydration issues thats why I used the rspack plugin for the SSR build
      // plugins: [
      //   pluginModuleFederation({
      //     dts: false,
      //     name: "rsbuild_ssr_hydration_remote_vue",
      //     filename: "remoteEntry.js",
      //     manifest: true,
      //     runtimePlugins: [
      //       require.resolve("@module-federation/node/runtimePlugin"),
      //     ],
      //     shared: {
      //       vue: {
      //         eager: true,
      //         singleton: true,
      //         requiredVersion: "^3.5.13",
      //       },
      //     },
      //     library: { type: "commonjs-module" },
      //     remoteType: "script",
      //   }),
      // ],
      tools: {
        rspack: {
          target: "async-node",
          externalsType: "commonjs",
          plugins: [
            new ModuleFederationPlugin({
              dts: false,
              name: "rsbuild_ssr_hydration_remote_vue",
              filename: "remoteEntry.js",
              manifest: true,
              exposes: {
                "./App": "./src/App.vue",
              },
              runtimePlugins: [
                require.resolve("@module-federation/node/runtimePlugin"),
              ],
              shared: {
                vue: {
                  eager: true,
                  singleton: true,
                  requiredVersion: "^3.5.13",
                },
              },
              library: { type: "commonjs-module" },
              remoteType: "script",
            }),
          ],
        },
      },
    },
  },
  html: {
    template: "./template.html",
  },
});
