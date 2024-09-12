import { describe, it, expect } from 'vitest'

describe('GET /api/top_five', () => {
  it('should return data from mocked API', async () => {
    const data = await $fetch(`http://localhost:3000/api/top_five`)
    expect(JSON.stringify(data)).toContain(`"country":"BRA"`)
    expect(JSON.stringify(data)).toContain(`"country":"USA"`)
    expect(JSON.stringify(data)).toContain(`"country":"IND"`)
    expect(JSON.stringify(data)).toContain(`"country":"FRA"`)
    expect(JSON.stringify(data)).toContain(`"country":"DEU"`)
  })
})
