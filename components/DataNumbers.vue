<script lang="ts" setup>

const { formatNumber } = useNumberFormatter();
const {} = defineProps<{
  cases: number
  deaths: number
  pct: number
}>()
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 mt-[20px] sm:gap-0 gap-[20px]">
    <div class="text-center">
      <h3 class="text-[#4F4544] leading-7">Total de casos</h3>
      <p class="font-title text-[#ED6160] text-[24px] font-bold">{{ formatNumber(cases) }}</p>
    </div>
    <div class="sm:border-x sm:border-[#F4F4F4] text-center">
      <h3 class="text-[#4F4544] leading-7">Mortes</h3>
      <p class="font-title text-[#ED6160] text-[24px] font-bold">{{ formatNumber(deaths) }}</p>
    </div>
    <div class="text-center">
      <h3 class="text-[#4F4544] leading-7">Fatalidade</h3>
      <p class="font-title text-[#ED6160] text-[24px] font-bold">{{ pct }}%</p>
    </div>
  </div>
</template>

