export interface Countries {
  iso: string
  name: string
}

export interface CountriesResponse {
  data: Countries[]
}

export interface RegionInterface {
  iso: string
  name: string
  province: string
  lat: number | string
  long: number | string
  cities: any[]
}

export interface ReportsData {
  current_page: number
  per_page: number | string
  last_page: number
  from: number
  to: number
  total: number
  first_page_url: string
  last_page_url: string
  next_page_url: string
  prev_page_url: string
  path: string
  data: Reports[]
}

export interface Reports {
  date: string | Date
  confirmed: number
  deaths: number
  recovered: number
  confirmed_diff: number
  deaths_diff: number
  recovered_diff: number
  last_update: string | Date
  active: number
  active_diff: number
  fatality_rate: number
  region: RegionInterface
}

export interface RangePagination {
  name: number
  isDisabled: boolean
}