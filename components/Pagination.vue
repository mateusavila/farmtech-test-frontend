<script setup lang="ts">
import type { RangePagination } from '~/utils/types'

const data = defineProps<{
  pending: string
  page: number
  lastPage: number
  perPage: number | string
  total: number
}>()
const emit = defineEmits<{
  paginate: [page: number]
}>()
const maxVisible = ref<number>(5)
const range = ref<RangePagination[]>([])
const startPage = () => {
  if (data.page === 1) {
    return 1
  }
  if (data.page === data.lastPage) {
    return data.lastPage - maxVisible.value + 1
  }
  return data.page - 1
}
const paginate = (page: number): void => emit('paginate', page)
const endPage = (): number => Math.min(startPage() + maxVisible.value - 1, data.lastPage)

watch([() => data.page, () => data.lastPage, () => data.perPage], () => {
  range.value = []
  for (let i = startPage(); i <= endPage(); i++) {
    range.value.push({ name: i, isDisabled: i === data.page })
  }
}, { immediate: true, deep: true })

const buttonClass = ref('text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center text-[14px]')
</script>

<template>
  <template v-if="pending === 'success'">
    <div class="w-full flex sm:gap-[10px] mt-[20px] justify-center flex-wrap gap-[2px]">
      <button title="primeira página" :class="buttonClass" v-if="data.lastPage > 1 && data.page > 1"
        @click="paginate(1)">
        <img src="/first.svg" alt="primeira página" width="24" height="24" loading="lazy">
      </button>
      <button title="página anterior" :class="buttonClass" v-if="data.lastPage > 1 && data.page > 1"
        @click="paginate(data.page - 1)">
        <img src="/previous.svg" alt="página anterior" width="24" height="24" loading="lazy">
      </button>
      <client-only>
        <template v-if="data.lastPage > 1">
          <button 
            :title="`página ${name}`"
            v-for="{ name, isDisabled }, index in range"
            :key="index"
            class="sm:block hidden"
            :class="[buttonClass, { 
              'bg-[#ccc] opacity-30': isDisabled 
            }]"
            :disabled="isDisabled"
            @click="paginate(name)">{{ name }}</button>
        </template>
      </client-only>
      <button title="próxima página" :class="buttonClass" v-if="data.lastPage > 1 && data.page < data.lastPage"
        @click="paginate(data.page + 1)">
        <img src="/next.svg" alt="próxima página" width="24" height="24" loading="lazy">
      </button>
      <button title="última página" :class="buttonClass" v-if="data.lastPage > 1 && data.page < data.lastPage"
        @click="paginate(data.lastPage)">
        <img src="/ultimate.svg" alt="última página" width="24" height="24" loading="lazy">
      </button>
    </div>
  </template>
</template>