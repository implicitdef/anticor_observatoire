import { ItemsList } from '@/components/ItemsList'
import { SearchPanel } from '@/components/SearchPanel'
import { getData } from '@/lib/dataReader'
import { Metadata } from 'next'
import z from 'zod'

export type NextSearchParams = { [key: string]: string | string[] | undefined }

const searchParamsSchema = z.object({
  query: z.string().optional(),
})
type SearchParams = z.infer<typeof searchParamsSchema>

const ENABLE_SEARCH_PANEL = false // la feature n'est pas terminée

export const metadata: Metadata = {
  title: 'La revue de presse - Observatoire - Anticor',
}

export default function RevueDePresse({
  searchParams,
}: {
  params: unknown
  searchParams: NextSearchParams
}) {
  const allItems = getData()
  const parsingRes = searchParamsSchema.safeParse(searchParams)
  const { query }: SearchParams = parsingRes.success ? parsingRes.data : {}
  const items = query
    ? allItems.filter(
        (_) => _.contenu.includes(query) || _.titre.includes(query),
      )
    : allItems
  return (
    <div className="container px-4 py-28 mx-auto">
      <h1 className="text-4xl font-bold mb-10 text-gray-700 uppercase text-left">
        La revue de presse
      </h1>
      {ENABLE_SEARCH_PANEL && <SearchPanel />}

      <ItemsList {...{ items, searchParams }} />
    </div>
  )
}
