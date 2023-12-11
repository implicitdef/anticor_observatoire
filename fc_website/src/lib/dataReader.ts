import rows from "../../../data_collector/data/rows.json";
import z from "zod";

const thingSchema = z.union([
  z.string(),
  z
    .object({
      id: z.number(),
      value: z.string(),
    })
    .strict(),
]);
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
  })
  .strict()
  .array();

export type Item = z.infer<typeof rowsSchema>[number];

export function getData(): Item[] {
  return rowsSchema.parse(rows);
}
