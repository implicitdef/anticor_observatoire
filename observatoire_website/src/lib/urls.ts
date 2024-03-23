import { Item } from './dataReader'
import {
  TypedTag,
  hasKindDepartements,
  identifyDepartementsTagForUrl,
  parseDate,
  readTitre,
  slugify,
} from './utils'

export function buildUrlHome() {
  return '/'
}
export function buildUrlList() {
  return '/revuedepresse'
}
export function buildUrlAPropos() {
  return '/apropos'
}
export function buildUrlTag(tag: TypedTag) {
  if (hasKindDepartements(tag)) {
    const res = identifyDepartementsTagForUrl(tag)
    if (res.kind === 'departement') {
      return `/departement/${res.number}`
    }
    return `/pays/${slugify(res.name)}`
  }
  return `/tag/${slugify(tag.value)}`
}
export function buildUrlItem(item: Item) {
  const date = parseDate(item.date)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  return `/${year}/${month}/${day}/${item.id}-${slugify(readTitre(item))}`
}
