<template>
  <div class="error flex align-items-center justify-content-center h-screen flex-column z-1">
    <h1 class="text-8xl text-red-400">ERROR</h1>
    <h3 class="uppercase color-white line-height-4">{{ error?.message }}</h3>
    <h3 class="color-white line-height-4">Go back to</h3>
    <nuxt-link
      to="/"
      class="uppercase no-underline text-2xl text-yellow-400"
    >
      Home
    </nuxt-link>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Press+Start+2P');

.error {
  background: linear-gradient(#4b5aa3, #7d94fe);
  font-family: 'Press Start 2P', cursive;
  text-shadow: 4px 4px #445293;
}
</style>

<script setup lang="ts">
defineProps({
  error: Object
})
</script>
