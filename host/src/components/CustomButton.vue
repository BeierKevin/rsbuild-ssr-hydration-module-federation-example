<template>
  <button class="custom-button base-accordion" @click="handleClick">
    Click Me {{ counter }}
  </button>
</template>

<script setup>
import { defineEmits, ref } from "vue";

const emit = defineEmits(["click"]);

const counter = ref(0);
const increment = () => {
  counter.value++;
  console.log("Counter Shell:", counter.value);
};

function handleClick() {
  emit("click");
  increment();
  console.log("Shell Button clicked");
}
</script>

<style scoped>
.custom-button {
  padding: 0.5rem 1.5rem;
  color: white;
  font-weight: 600;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  background-color: red;
  cursor: pointer;
}

.custom-button:hover {
  background-color: #2563eb;
}

.custom-button:active {
  background-color: #1d4ed8;
}

.custom-button:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3);
}
</style>
