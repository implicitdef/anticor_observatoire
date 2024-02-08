import { TagKind } from '@/app/revuedepresse/tag/[kind]/[id]/page'
import { Item, Tag } from './dataReader'

// 2023-11-03 => 3 novembre 2023
export function formatDateVerbose(dateStr: string): string {
  const date = parseDate(dateStr)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const formatter = new Intl.DateTimeFormat('fr-FR', options)
  return formatter.format(date)
}

export function parseDate(dateStr: string) {
  const [year, month, day] = dateStr
    .split('-')
    .map((part) => parseInt(part, 10))
  const date = new Date(year, month - 1, day)
  return date
}

export function pickTagsList(item: Item, tagKind: TagKind) {
  switch (tagKind) {
    case 'categories':
      return item.categorie
    case 'departements':
      return item.departement
    case 'personnalites':
      return item.personnalites
    case 'personnes_morales':
      return item.personnes_morales
    case 'procedure':
      return item.procedure
    case 'theme':
      return item.theme
  }
}

export function readTagsOfItem(item: Item) {
  const categories = item.categorie.map((_) => ({
    ..._,
    kind: 'categories' as const,
  }))
  const departements = item.departement.map((_) => ({
    ..._,
    kind: 'departements' as const,
  }))
  const personnalites = item.personnalites.map((_) => ({
    ..._,
    kind: 'personnalites' as const,
  }))
  const personnes_morales = item.personnes_morales.map((_) => ({
    ..._,
    kind: 'personnes_morales' as const,
  }))
  const procedures = item.procedure.map((_) => ({
    ..._,
    kind: 'procedure' as const,
  }))
  const themes = item.theme.map((_) => ({
    ..._,
    kind: 'theme' as const,
  }))

  const tags: { id: number; value: string; kind: TagKind }[] = [
    ...categories,
    ...departements,
    ...personnalites,
    ...personnes_morales,
    ...procedures,
    ...themes,
  ]
  return tags
}

export function shorten(s: string, limit: number) {
  if (s.length <= limit) return s
  return s.slice(0, limit) + `...`
}

export function getTagById(
  allItems: Item[],
  tagKind: TagKind,
  id: number,
): Tag | undefined {
  const tagsList = allItems.flatMap((item) => {
    return pickTagsList(item, tagKind)
  })
  return tagsList.find((_) => _.id === id)
}

export function getItemsWithSameTag(
  allItems: Item[],
  tag: { id: number; kind: TagKind },
) {
  return allItems.filter((item) => {
    const tagsList = pickTagsList(item, tag.kind)
    return tagsList.some((_) => _.id === tag.id)
  })
}

export function firstOfArray<A>(arr: A[]): A | undefined {
  return arr.length > 0 ? arr[0] : undefined
}
