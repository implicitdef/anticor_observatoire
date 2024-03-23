import { Item } from './dataReader'
import z from 'zod'

export const paginationParamsSchema = z.object({
  page: z.coerce.number().optional(),
})
export type PaginationParams = z.infer<typeof paginationParamsSchema>

const ITEMS_BY_PAGE = 50

export type PaginatedResults = ReturnType<typeof getPaginatedResults>

export function getPaginatedResults(
  allItems: Item[],
  searchParams: PaginationParams,
) {
  const parsingRes = paginationParamsSchema.safeParse(searchParams)
  const searchParamsParsed: PaginationParams = parsingRes.success
    ? parsingRes.data
    : {}
  const currentPage = searchParamsParsed.page ?? 1
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
