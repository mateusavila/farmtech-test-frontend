export default defineCachedEventHandler(async () => {
  const data = await $fetch(`https://covid-api.com/api/regions?order=iso`)

  return data
}, {
  maxAge: 60 * 60 * 24 * 365,
  name: 'covid-regions'
})
