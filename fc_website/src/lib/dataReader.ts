import z from 'zod'
import rows from '../../../data_collector/data/rows.json'

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
    categorie: thingSchema.array().max(1),
    theme: thingSchema.array(),
    procedure: thingSchema.array().max(1),
  })
  .strict()
  .array()

export type Item = z.infer<typeof rowsSchema>[number]

export function getData(): Item[] {
  return rowsSchema.parse(rows)
}

export type Tag = {
  id: number
  value: string
}
