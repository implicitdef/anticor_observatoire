import { NextSearchParams } from '@/app/revuedepresse/page'
import { ItemsList } from '@/components/ItemsList'
import { getData } from '@/lib/dataReader'
import { buildUrlList } from '@/lib/urls'
import { getItemsWithSameTag, getTagById, pickTagsList } from '@/lib/utils'
import Link from 'next/link'

export type TagKind =
  | 'categories'
  | 'departements'
  | 'personnalites'
  | 'personnes_morales'
  | 'procedure'
  | 'theme'

type LocalParams = {
  kind: TagKind
  id: string
}

export default function TagPage({
  params,
  searchParams,
}: {
  params: LocalParams
  searchParams: NextSearchParams
}) {
  const tagId = parseInt(params.id, 10)
  const tagKind = params.kind
  const data = getData()
  const items = getItemsWithSameTag(data, { id: tagId, kind: tagKind })
  const tag = getTagById(data, tagKind, tagId)
  return (
    <div className="container px-4 py-28 mx-auto">
      <h1 className="text-2xl font-bold mb-10 text-gray-700 text-center">
        <Link href={buildUrlList()} className="underline">
          La revue de presse
        </Link>
        {tag && (
          <>
            {' > '}
            <span className="font-normal ">{tag.value}</span>
          </>
        )}
      </h1>
      <ItemsList {...{ items, searchParams }} />
    </div>
  )
}
