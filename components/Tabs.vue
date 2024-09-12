<script lang="ts" setup>
const tab = defineModel<number>()
const emit = defineEmits<{
  changeTab: [tab: number]
}>()

const changeTab = (tab: number) => emit('changeTab', tab)
</script>

<template>
  <div class="w-full mb-[20px] flex gap-[10px] justify-center">
    <button 
      type="button" 
      @click="changeTab(0)" 
      :class="{
        'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800': tab === 0,
        'py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700': tab === 1
      }">Casos</button>
    <button type="button" @click="changeTab(1)" :class="{
        'focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900': tab === 1,
        'py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700': tab === 0
      }">Mortes</button>
  </div>
</template>
