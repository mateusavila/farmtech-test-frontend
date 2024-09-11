<script lang="ts" setup>
import type { Countries } from '~/utils/types'

useHead({
  title: 'Farmtech - Teste Frontend'
})

const { public: { baseURL, localURL } } = useRuntimeConfig()

// importar a lista de países
const { data: countries, status } = await useFetch<CountriesResponse>('/countries', {
  baseURL: localURL,
  // @ts-ignore: O transform está reportando um erro que não faz sentido. Como a rota /countries gera um data: Countries[], estou usando esta função para facilitar a captura dos dados.
  transform: (response) => response.data
});

const country = ref('')
const filterCountry = (ct: string) => {
  console.log(ct)
  country.value = ct
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
      <template v-if="status === 'pending'">
        <Box>
          <img 
            src="/loading.svg" 
            alt="loading" 
            width="64" 
            height="64" 
            loading="lazy">
        </Box>
      </template>
      <template v-if="status !== 'pending'">
        <Box title="África do Sul">
          <DataNumbers 
            :cases="32687680"
            :deaths="1233"
            :pct="2.05"
          />
        </Box>
          <Box title="Estados Unidos">
          <DataNumbers 
            :cases="32687680"
            :deaths="1233"
            :pct="2.05"
          />
        </Box>
        <Box title="Brasil">
          <DataNumbers 
            :cases="32687680"
            :deaths="1233"
            :pct="2.05"
          />
        </Box>
      </template>
    </MainContent>
  </NuxtLayout>
</template>
