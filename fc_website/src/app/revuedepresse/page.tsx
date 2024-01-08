import { Pagination } from '@/components/Pagination'
import { Item, getData } from '@/lib/dataReader'
import {
  SearchParams,
  getPaginatedResults,
  searchParamsSchema,
} from '@/lib/searchAndPagination'
import { formatDateVerbose } from '@/lib/utils'
import Link from 'next/link'
import { TagKind } from './tag/[kind]/[id]/page'
import { ItemsList } from '@/components/ItemsList'

export type NextSearchParams = { [key: string]: string | string[] | undefined }

export default function RevueDePresse({
  searchParams,
}: {
  params: unknown
  searchParams: NextSearchParams
}) {
  const items = getData()
  return (
    <div className="px-4 py-28">
      <h1 className="text-2xl font-bold mb-10 text-zinc-700 text-center">
        La revue de presse
      </h1>
      <ItemsList {...{ items, searchParams }} />
    </div>
  )
}
