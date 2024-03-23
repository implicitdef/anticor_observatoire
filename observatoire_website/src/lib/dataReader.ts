import z from 'zod'
import rows from '../../../data_collector/data/rows.json'
import { parseDate } from './utils'

const thingSchema = z
  .object({
    id: z.number(),
    value: z.string(),
  })
  .strict()

const rowsSchema = z
  .object({
    id: z.number(),
    titre: z.string(),
    contenu: z.string(),
    url: z.string(),
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .nullable(),
    etiquettes: z.string(),
    departement: thingSchema.array(),
    personnalites: thingSchema.array(),
    personnes_morales: thingSchema.array(),
    categorie: thingSchema.array(),
    theme: thingSchema.array(),
    procedure: thingSchema.array(),
    titre_corrige: z.string().nullable(),
    a_la_une: z.boolean(),
  })
  .strict()
  .array()

type ItemRaw = z.infer<typeof rowsSchema>[number]

export type Item = ItemRaw & {
  date: string
}

export function getData(): Item[] {
  const cutoffDate = new Date('2023-01-01T00:00:00')
  return rowsSchema.parse(rows).filter((_) => {
    return _.date && parseDate(_.date).getTime() >= cutoffDate.getTime()
  }) as Item[] // we filter on the date, so know we can cast down, the date is not null
}

export type Tag = {
  id: number
  value: string
}

export type TagKind =
  | 'categories'
  | 'departements'
  | 'personnalites'
  | 'personnes_morales'
  | 'procedure'
  | 'theme'
