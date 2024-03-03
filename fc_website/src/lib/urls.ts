import { Item } from './dataReader'
import {
  TypedTag,
  hasKindDepartements,
  identifyDepartementsTagForUrl,
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
  return `/revuedepresse/${item.id}`
}
