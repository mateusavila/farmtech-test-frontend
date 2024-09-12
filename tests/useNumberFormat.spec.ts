import { describe, it, expect } from 'vitest'
import { useNumberFormatter } from '../composables/useNumberFormat'

describe('useNumberFormat', () => {
  it('should format the number properly', () => {
    const { formatNumber } = useNumberFormatter()
    expect(formatNumber(123456789)).toBe('123.456.789')
  })

  it('should return null if the value is not a number', () => {
    const { formatNumber } = useNumberFormatter()

    // @ts-ignore: forcing a wrong parameter type
    expect(formatNumber('123456789')).toBeNull()
  })

  it('should format the big number to a more readable number', () => {
    const { formatLargeNumber } = useNumberFormatter()

    expect(formatLargeNumber(120000000)).toBe('120M')
    expect(formatLargeNumber(20000000)).toBe('20M')
  })
})