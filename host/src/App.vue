<template>
  <div>
    <h1>rsbuild_ssr_hydration_host_vue</h1>
    <CustomButton @click="onButtonClick" />
    <RsbuildRemoteComponent />
  </div>
</template>

<script lang="ts" setup>
import CustomButton from "./components/CustomButton.vue";
import RsbuildRemoteComponent from "./components/RsbuildRemoteComponent.vue";

function onButtonClick() {
  console.log("Shell CustomButton emitted a click event!");
}
</script>
