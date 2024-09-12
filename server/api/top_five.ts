import { DataReports } from "~/utils/types"

export default defineCachedEventHandler(async () => {
  const { public: { baseURL } } = useRuntimeConfig()
  const USA = await $fetch<Omit<DataReports, 'region'>>(`/reports/total?iso=USA`, { baseURL })
  const BRA = await $fetch<Omit<DataReports, 'region'>>(`/reports/total?iso=BRA`, { baseURL })
  const IND = await $fetch<Omit<DataReports, 'region'>>(`/reports/total?iso=IND`, { baseURL })
  const FRA = await $fetch<Omit<DataReports, 'region'>>(`/reports/total?iso=FRA`, { baseURL })
  const DEU = await $fetch<Omit<DataReports, 'region'>>(`/reports/total?iso=DEU`, { baseURL })

  const data = [
    { country: 'USA', ...USA.data },
    { country: 'BRA', ...BRA.data },
    { country: 'IND', ...IND.data },
    { country: 'FRA', ...FRA.data },
    { country: 'DEU', ...DEU.data }
  ]

  return data
}, {
  maxAge: 60 * 60 * 24 * 365,
  name: 'top_five'
})
