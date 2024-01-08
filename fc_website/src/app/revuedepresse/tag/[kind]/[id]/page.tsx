import { NextSearchParams } from '@/app/revuedepresse/page'
import { ItemsList } from '@/components/ItemsList'
import { getData, getTagById } from '@/lib/dataReader'
import { pickTagsList } from '@/lib/utils'
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
  const items = getData().filter((item) => {
    const tagsList = pickTagsList(item, tagKind)
    return tagsList.some((_) => _.id === tagId)
  })
  const tag = getTagById(tagKind, tagId)
  return (
    <div className="px-4 py-28">
      <h1 className="text-2xl font-bold mb-10 text-zinc-700 text-center">
        <Link href="/revuedepresse" className="underline">
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
