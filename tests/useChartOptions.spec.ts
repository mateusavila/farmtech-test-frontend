import { describe, it, expect, vi } from 'vitest'
import { useChartOptions } from '../composables/useChartOptions'

// Mock da função useNumberFormatter
vi.mock('../composables/useNumberFormatter', () => ({
  useNumberFormatter: () => ({
    formatNumber: vi.fn((val) => `formattedNumber-${val}`),
    formatLargeNumber: vi.fn((val) => `formattedLargeNumber-${val}`)
  })
}))

describe('useNumberFormat', () => {
  it('should format the number properly', () => {
    const options = useChartOptions(['#000000']).options
    const jsonOptions = JSON.stringify(options.value)
    expect(jsonOptions).toBe('{"chart":{"type":"bar","height":350,"animations":{"enabled":true,"dynamicAnimation":{"enabled":true,"speed":850}}},"plotOptions":{"bar":{"horizontal":false,"columnWidth":"55%","endingShape":"rounded"}},"dataLabels":{"enabled":false},"colors":["#000000"],"stroke":{"show":true,"width":2,"colors":["transparent"]},"xaxis":{"categories":[]},"fill":{"opacity":1},"tooltip":{"y":{}},"yaxis":{"labels":{}}}')
  })

  it('should return correct chart options', () => {
    const options = useChartOptions(['#000000']).options
    const jsonOptions = JSON.stringify(options.value)
    expect(jsonOptions).toContain('"chart":{"type":"bar","height":350')
    expect(jsonOptions).toContain('"colors":["#000000"]')
    expect(jsonOptions).toContain('"stroke":{"show":true,"width":2,"colors":["transparent"]}')
  })

  it('should format the number properly in tooltip formatter', () => {
    const { options } = useChartOptions(['#000000'])

    // Simula a chamada do formatter no tooltip
    const tooltipFormatter = options.value.tooltip.y.formatter
    const formattedTooltipValue = tooltipFormatter(100)
    expect(formattedTooltipValue).toBe('100')

    // Simula a chamada do formatter no yaxis.labels
    const yaxisFormatter = options.value.yaxis.labels.formatter
    const formattedYAxisValue = yaxisFormatter(1000)
    expect(formattedYAxisValue).toBe('1K')
  })


})