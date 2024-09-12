<script lang="ts" setup>
import type { Countries } from '~/utils/types'
useHead({
  title: 'Farmtech - Teste Frontend',
  htmlAttrs: {
    lang: 'pt-br'
  }
})

useSeoMeta({
  title: 'Farmtech - Teste Frontend',
  ogTitle: 'Farmtech - Teste Frontend',
  description: 'Este website é um teste para trabalhar na empresa FarmTech.',
  ogDescription: 'Este website é um teste para trabalhar na empresa FarmTech.',
  ogImage: 'https://farmtech-test-frontend.vercel.app/share.jpg',
  twitterCard: 'summary_large_image',
})

const { public: { baseURL, localURL } } = useRuntimeConfig()

// importar a lista de países
const { data: countries } = await useLazyFetch<CountriesResponse>('/countries', {
  baseURL: localURL,
  // @ts-ignore: O transform está reportando um erro que não faz sentido. Como a rota /countries gera um data: Countries[], estou usando esta função para facilitar a captura dos dados.
  transform: (response) => response.data
});

// importar a lista de países
const { data: top5 } = await useLazyFetch<Omit<Reports[], 'region'>>('/top_five', {
  baseURL: localURL
});

const iso = ref('')
const filterCountry = (country: string) => {
  iso.value = country
  page.value = 1
}

const page = ref(1)
const params = ref<{
  page: Ref<number>
  iso?: Ref<string>
}>({ page })

watch(() => iso.value, (i) => {
  if (i) {
    params.value = { page, iso }
  } else {
    params.value = { page }
  }
}, {  immediate: true, deep: true })

const { data, status, refresh } = await useLazyFetch<ReportsData>('/reports?per_page=20', {
  baseURL,
  watch: [page],
  params
});

await refresh()
const onLoadMore = async (p: number) => {
  page.value = p
  await refresh()
}

const casesChartOptions = useChartOptions(['#3E8DF3']).options.value
const deathsChartOptions = useChartOptions(['#C81E1E']).options.value

const tab = ref(0)
const cases = ref<{name: string, data: number[]}[]>([{
  name: 'Casos',
  data: [0,0,0,0,0]
}])
const deaths = ref<{name: string, data: number[]}[]>([{
  name: 'Mortes',
  data: [0,0,0,0,0]
}])

watch(() => top5.value, (top) => {
  if (top && top.length) {
    const casesArr = [...top]
    const deathsArr = [...top]
    const casesSortData = casesArr.sort((a,b) => a.confirmed - b.confirmed)
    const deathSortData = deathsArr.sort((a,b) => a.deaths - b.deaths)
    
    cases.value = [{
      name: 'Casos',
      data: casesSortData.map((item) => item.confirmed)
    }]
    deaths.value = [{
      name: 'Mortes',
      data: deathSortData.map((item) => item.deaths)
    }]
    
    casesChartOptions.xaxis.categories = casesSortData.map((item) => item.country)
    deathsChartOptions.xaxis.categories = deathSortData.map((item) => item.country)
  }
}, { immediate: true })

const changeTab = (t: number) => tab.value = t
</script>

<template>
  <NuxtLayout>
    <MainTitle />
    <MainContent>
      <Box title="TOP 5">
        <Tabs @change-tab="changeTab" v-model="tab" />
        <ClientOnly>
          <template v-if="tab === 0">
            <apexchart type="bar" height="350" :options="casesChartOptions" :series="cases"></apexchart>
          </template>
          <template v-if="tab === 1">
            <apexchart type="bar" height="350" :options="deathsChartOptions" :series="deaths"></apexchart>
          </template>
        </ClientOnly>
      </Box>
      <Box title="Filtrar dados sobre um país">
        <Filter 
          @submit="filterCountry" 
          :countries="(countries as Countries[])">
        </Filter>
      </Box>
      <template v-if="status !== 'pending' && data && data.data && data.data.length">
        <Box 
          v-for="{ region, confirmed, deaths, fatality_rate }, index in data.data" 
          :key="index" 
          :title="`${region.name}${region.province ? ` - ${region.province}` : ''}`">
          <DataNumbers 
            :cases="confirmed"
            :deaths="deaths"
            :pct="fatality_rate" />
        </Box>
      </template>
      <template v-if="status !== 'pending' && data && data.data && !data.data.length">
        <Box title="Nenhum dado encontrado" />
      </template>
      <template v-if="status === 'pending'">
        <Box title="Carregando">
          <img 
            src="/loading.svg" 
            alt="loading" 
            width="64" 
            height="64" 
            loading="lazy"
            class="mx-auto">
        </Box>
      </template>
      <LazyPagination v-if="data && data.data && data.data.length"
        :total="data.total"
        :page="page"
        :per-page="data.per_page"
        :last-page="data.last_page"
        :pending="status"
        @paginate="onLoadMore" />
    </MainContent>
  </NuxtLayout>
</template>
