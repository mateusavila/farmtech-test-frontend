<script lang="ts" setup>
import type { Countries } from '~/utils/types'
useHead({
  title: 'Farmtech - Teste Frontend'
})

const { public: { baseURL, localURL } } = useRuntimeConfig()

// importar a lista de países
const { data: countries } = await useFetch<CountriesResponse>('/countries', {
  baseURL: localURL,
  // @ts-ignore: O transform está reportando um erro que não faz sentido. Como a rota /countries gera um data: Countries[], estou usando esta função para facilitar a captura dos dados.
  transform: (response) => response.data
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
}>({
  page
})

watch(() => iso.value, (i) => {
  if (i) {
    params.value = {
      page, 
      iso
    }
  } else {
    params.value = {
      page
    }
  }
}, { immediate: true, deep: true })

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
</script>

<template>
  <NuxtLayout>
    <MainTitle />
    <MainContent>
      <Box title="Filtrar dados sobre um país">
        <Filter 
          @submit="filterCountry" 
          :countries="(countries as Countries[])">
        </Filter>
      </Box>
      <template v-if="status !== 'pending' && data && data.data && data.data.length">
        <Box v-for="item, index in data.data" :key="index" :title="`${item.region.name}${item.region.province ? ` - ${item.region.province}` : ''}`">
          <DataNumbers 
            :cases="item.confirmed"
            :deaths="item.deaths"
            :pct="item.fatality_rate" />
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
