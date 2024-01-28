import { ItemsList } from '@/components/ItemsList'
import { SearchPanel } from '@/components/SearchPanel'
import { getData } from '@/lib/dataReader'
import { useState } from 'react'
import z from 'zod'

export type NextSearchParams = { [key: string]: string | string[] | undefined }

const searchParamsSchema = z.object({
  query: z.string().optional(),
})
type SearchParams = z.infer<typeof searchParamsSchema>

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
      <h1 className="text-2xl font-bold mb-10 text-gray-700 text-center">
        La revue de presse
      </h1>
      <SearchPanel />

      <ItemsList {...{ items, searchParams }} />
    </div>
  )
}
