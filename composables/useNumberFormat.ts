export function useNumberFormatter() {
  const formatNumber = (number: number) => {
    if (typeof number !== 'number') {
      return null
    }
    return new Intl.NumberFormat('pt-BR').format(number)
  }

  const formatLargeNumber = (number: number): string => {
    const suffixes = ["", "K", "M", "B", "T"]

    if (number === 0) return "0"

    const magnitude = Math.floor(Math.log10(Math.abs(number)) / 3)
    const suffix = suffixes[magnitude]
    const scaled = number / Math.pow(1000, magnitude)
    const rounded = Math.round(scaled * 10) / 10

    return rounded % 1 === 0 ? rounded + suffix : rounded.toFixed(1) + suffix
  }

  return {
    formatNumber,
    formatLargeNumber
  }
}