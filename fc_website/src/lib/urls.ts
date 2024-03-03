import { Item } from './dataReader'
import { TypedTag } from './utils'

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
  return `/revuedepresse/tag/${tag.kind}/${tag.id}`
}
export function buildUrlItem(item: Item) {
  return `/revuedepresse/${item.id}`
}
