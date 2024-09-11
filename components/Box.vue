<script setup lang="ts">
const { title } = defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="w-full bg-full rounded p-[20px] shadow bg-[#fff]">
    <template v-if="title?.length">
      <h2 class="text-center font-title font-bold text-[#4E4644] text-[clamp(1.25rem,1.0523rem+0.9302vw,1.75rem)]" >{{ title }}</h2>
    </template>
    <slot />   
  </div>
</template>
