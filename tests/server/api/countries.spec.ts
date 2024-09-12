// tests/api/countries.test.ts
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest'
import { setupServer } from 'msw/node'
import { HttpResponse, http } from 'msw'

export const handlers = [
  http.get('https://covid-api.com/api/regions', () => {
    return HttpResponse.json()
  }),
]
// Configura o MSW para rodar no ambiente de testes
const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('GET /api/countries', () => {
  it('should return data from mocked API', async () => {

    const data = await $fetch(`http://localhost:3000/api/countries`)

    expect(JSON.stringify(data)).toContain(`{"iso":"BRA","name":"Brazil"}`)
  })
})
