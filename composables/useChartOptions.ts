export function useChartOptions(colors: string[]) {
  const { formatNumber, formatLargeNumber } = useNumberFormatter()
  const options = ref({
    chart: {
      type: 'bar',
      height: 350,
      animations: {
        enabled: true,
        dynamicAnimation: {
          enabled: true,
          speed: 850
        }
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    colors,
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: [] as string[],
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: (val: number) => formatNumber(val)
      }
    },
    yaxis: {
      labels: {
        formatter: (val: number) => formatLargeNumber(val)
      }
    },
  })

  return {
    options
  }
}