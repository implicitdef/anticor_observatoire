import { Item } from './dataReader'
import z from 'zod'

export const searchParamsSchema = z.object({
  page: z.coerce.number().optional(),
})
export type SearchParams = z.infer<typeof searchParamsSchema>

const ITEMS_BY_PAGE = 50

export type PaginatedResults = ReturnType<typeof getPaginatedResults>

export function getPaginatedResults(
  allItems: Item[],
  searchParams: SearchParams,
) {
  const currentPage = searchParams.page ?? 1
  const startIndex = (currentPage - 1) * ITEMS_BY_PAGE
  const endIndex = startIndex + ITEMS_BY_PAGE
  const items = allItems.slice(startIndex, endIndex)
  const total = allItems.length
  const nbPages = Math.ceil(total / ITEMS_BY_PAGE)
  const allPages = Array.from({ length: nbPages }, (_, i) => i + 1)

  return {
    items,
    total: items.length,
    currentPage,
    allPages,
  }
}
