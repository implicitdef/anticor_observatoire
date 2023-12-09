import { getBaserowApiToken } from './utils'
import axios from 'axios'
import { z } from 'zod'

const MAIN_TABLE_ID = '223611' // nommée "Import site 26/11/23"
const ONE_PAGE_ONLY = false // to go quicker in dev

async function readTable() {
  const firstPageUrl = `https://api.baserow.io/api/database/rows/table/${MAIN_TABLE_ID}/?size=200`

  async function inner(nextPageUrl?: string): Promise<Row[]> {
    const url = nextPageUrl ?? firstPageUrl
    const res = await call(url)
    const nextResults = res.next && !ONE_PAGE_ONLY ? await inner(res.next) : []
    return [...res.results, ...nextResults]
  }

  return inner()
}

async function call(url: string): Promise<ApiResponse> {
  const config = {
    headers: { Authorization: `Token ${getBaserowApiToken()}` },
  }
  console.log(`>>> ${url}`)
  const res = await axios.get(url, config)
  return apiResponseSchema.parse(res.data)
}

export async function run() {
  const res = (await readTable()) as Row[]
  console.log('@@@', res)
}

// type Row = {
//   id: number
//   order: string
//   field_1556848: string
//   field_1556849: string
//   field_1556850: string
//   field_1556851: string
//   field_1556852: string
//   field_1556853: unknown
//   field_1557648: unknown
//   field_1557650: unknown
//   field_1557681: unknown
//   field_1557682: unknown
//   field_1561023: unknown
// }

const rowSchema = z.object({
  id: z.number(),
  order: z.string(),
  field_1556848: z.string(),
  field_1556849: z.string(),
  field_1556850: z.string(),
  field_1556851: z.string().nullable(),
  field_1556852: z.string(),
  field_1556853: z.union([z.string(), z.object({})]).array(),
  field_1557648: z.union([z.string(), z.object({})]).array(),
  field_1557650: z.union([z.string(), z.object({})]).array(),
  field_1557681: z.union([z.string(), z.object({})]).array(),
  field_1557682: z.union([z.string(), z.object({})]).array(),
  field_1561023: z.union([z.string(), z.object({})]).array(),
})

const apiResponseSchema = z.object({
  next: z.string().nullable(),
  count: z.number(),
  previous: z.string().nullable(),
  results: rowSchema.array(),
})

type Row = z.infer<typeof rowSchema>
type ApiResponse = z.infer<typeof apiResponseSchema>
