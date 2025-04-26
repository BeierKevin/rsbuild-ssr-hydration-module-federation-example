<template>
  <div>
    <h1>rsbuild_ssr_hydration_remote_vue</h1>
    <CustomButton @click="onButtonClick" />
  </div>
</template>

<script lang="ts" setup>
import CustomButton from "./components/CustomButton.vue";

function onButtonClick() {
  console.log("Remote CustomButton emitted a click event!");
}
</script>
