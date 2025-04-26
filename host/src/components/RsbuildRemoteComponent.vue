<script setup lang="ts">
import { defineAsyncComponent } from "vue";
const AppComponent = defineAsyncComponent(
  () => import("rsbuild_ssr_hydration_remote_vue/App")
);
</script>

<template>
  <div>
    <Suspense>
      <AppComponent />
      <template #fallback>
        <div>Loading A...</div>
      </template>
      <template #error>
        <div>Error loading A</div>
      </template>
    </Suspense>
  </div>
</template>
