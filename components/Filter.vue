<script lang="ts" setup>
const { countries } = defineProps<{
  countries: Countries[]
}>()
const emit = defineEmits<{
  submit: [country: string]
}>()
const country = ref('')

const getTheIso = (country: string) => countries.find(({name}) => country === name)?.iso ?? ''

const submit = () => emit("submit", getTheIso(country.value))
</script>

<template>
  <form
    class="max-w-[580px] w-full flex justify-center mx-auto mt-[10px]"
    action="#" 
    method="post" 
    @submit.prevent="submit">
    <input 
      type="text" 
      name="filter" 
      id="filter" 
      class="w-full border-b border-[#ED6160] h-[40px] bg-[url('/search.svg')] bg-no-repeat bg-left pl-[40px]"
      v-model="country"
      list="countries"
      @input="submit"
      placeholder="Digite o nome do país">
    <datalist id="countries">
      <option v-for="{ name } in countries" :key="name" :value="name">{{ name }}</option>
    </datalist>
  </form>
</template>

