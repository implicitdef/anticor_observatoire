import { getBaserowApiToken } from './utils'
import axios from 'axios'
import { z } from 'zod'

const MAIN_TABLE_ID = '223611' // nommée "Import site 26/11/23"
const ONE_PAGE_ONLY = false // to go quicker in dev
const ORDER_BY = `-field_1556851,field_1556848` // order by date desc, then by title

export async function readBaserow(): Promise<NiceRow[]> {
  const res = (await readTable()) as Row[]
  const res2 = res.map(mapRow)
  return res2
}

async function readTable() {
  const firstPageUrl = `https://api.baserow.io/api/database/rows/table/${MAIN_TABLE_ID}/?size=200&order_by=${ORDER_BY}`

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
  return apiResponseSchema.passthrough().parse(res.data)
}

export async function run() {
  const res = (await readTable()) as Row[]
  const res2 = res.map(mapRow)
  console.log('@@@', res2)
}

const departementSchema = z
  .object({
    id: z.number(),
    value: z.string(),
    color: z.string(),
  })
  .strict()
const personnaliteSchema = z
  .object({
    id: z.number(),
    value: z.string(),
  })
  .strict()
const personneMoraleSchema = z
  .object({
    id: z.number(),
    value: z.string(),
  })
  .strict()
const categorieSchema = z
  .object({
    id: z.number(),
    value: z.string(),
    color: z.string(),
  })
  .strict()
const themeSchema = z
  .object({
    id: z.number(),
    value: z.string(),
    color: z.string(),
  })
  .strict()
const procedureSchema = z
  .object({
    id: z.number(),
    value: z.string(),
    color: z.string(),
  })
  .strict()

const rowSchema = z
  .object({
    id: z.number(),
    order: z.string(),
    field_1556848: z.string(),
    field_1556849: z.string(),
    field_1556850: z.string(),
    field_1556851: z.string().nullable(),
    field_1556852: z.string(),
    field_1556853: z.union([z.string(), departementSchema]).array(),
    field_1557648: z.union([z.string(), personnaliteSchema]).array(),
    field_1557650: z.union([z.string(), personneMoraleSchema]).array(),
    field_1557681: z.union([z.string(), categorieSchema]).array(),
    field_1557682: z.union([z.string(), themeSchema]).array(),
    field_1561023: z.union([z.string(), procedureSchema]).array(),
  })
  .strict()

const apiResponseSchema = z.object({
  next: z.string().nullable(),
  count: z.number(),
  previous: z.string().nullable(),
  results: rowSchema.array(),
})

type Row = z.infer<typeof rowSchema>
type ApiResponse = z.infer<typeof apiResponseSchema>
type NiceRow = ReturnType<typeof mapRow>

function mapRow(row: Row) {
  const {
    id,
    field_1556848,
    field_1556849,
    field_1556850,
    field_1556851,
    field_1556852,
    field_1556853,
    field_1557648,
    field_1557650,
    field_1557681,
    field_1557682,
    field_1561023,
  } = row

  return {
    id,
    titre: field_1556848,
    contenu: field_1556849,
    url: field_1556850,
    date: field_1556851,
    etiquettes: field_1556852,
    departement: removeColors(field_1556853),
    personnalites: field_1557648,
    personnes_morales: field_1557650,
    categorie: removeColors(field_1557681),
    theme: removeColors(field_1557682),
    procedure: removeColors(field_1561023),
  }
}

function removeColors<A extends { color: string }>(
  arr: (string | A)[],
): (string | Omit<A, 'color'>)[] {
  return arr.map((elem) => {
    return typeof elem === 'string' ? elem : removeColor(elem)
  })
}

function removeColor<A extends { color: string }>(a: A): Omit<A, 'color'> {
  const { color, ...rest } = a
  return rest
}
