import { getBaserowApiToken } from './utils'
import axios from 'axios'
import { z } from 'zod'

const MAIN_TABLE_ID = '517' // nommée "Import site 26/11/23"
const ONE_PAGE_ONLY = false // to go quicker in dev
const ORDER_BY = `-field_4799,field_4796` // order by date desc, then by title

export async function readBaserow(): Promise<NiceRow[]> {
  const res = (await readTable()) as Row[]
  const res2 = res.map(mapRow)
  return res2
}

async function readTable() {
  const firstPageUrl = `https://baserow.anticor.org/api/database/rows/table/${MAIN_TABLE_ID}/?size=200&order_by=${ORDER_BY}`

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

const rowSchema = z.object({
  id: z.number(),
  order: z.string(),
  field_4796: z.string(),
  field_4801: z.string(),
  field_4800: z.string(),
  field_4799: z.string().nullable(),
  field_4816: z.string(),
  field_4805: departementSchema.array(),
  field_4809: personnaliteSchema.array(),
  field_4814: personneMoraleSchema.array(),
  field_4802: categorieSchema.array(),
  field_4803: themeSchema.array(),
  field_4804: procedureSchema.array(),
  field_4797: z.string().nullable(),
  field_4798: z.boolean(),
})
// Not strict, because a new column may be added
//.strict()

const apiResponseSchema = z.object({
  next: z.string().nullable(),
  count: z.number(),
  previous: z.string().nullable(),
  results: rowSchema.array(),
})

type Row = z.infer<typeof rowSchema>
type ApiResponse = z.infer<typeof apiResponseSchema>
export type NiceRow = ReturnType<typeof mapRow>

function mapRow(row: Row) {
  const {
    id,
    field_4796,
    field_4801,
    field_4800,
    field_4799,
    field_4816,
    field_4805,
    field_4809,
    field_4814,
    field_4802,
    field_4803,
    field_4804,
    field_4797,
    field_4798,
  } = row

  return {
    id,
    titre: field_4796,
    contenu: field_4801,
    url: field_4800,
    date: field_4799,
    etiquettes: field_4816,
    departement: removeColors(field_4805),
    personnalites: field_4809,
    personnes_morales: field_4814,
    categorie: removeColors(field_4802),
    theme: removeColors(field_4803),
    procedure: removeColors(field_4804),
    titre_corrige: field_4797,
    a_la_une: field_4798,
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
