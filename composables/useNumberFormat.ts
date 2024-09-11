export function useNumberFormatter() {
  const formatNumber = (number: number) => {
    if (typeof number !== 'number') {
      return null
    }
    return new Intl.NumberFormat('pt-BR').format(number)
  }

  return {
    formatNumber,
  }
}