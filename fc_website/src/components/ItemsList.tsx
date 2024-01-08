import { NextSearchParams } from '@/app/revuedepresse/page'
import { Item } from '@/lib/dataReader'
import { getPaginatedResults } from '@/lib/searchAndPagination'
import { formatDateVerbose } from '@/lib/utils'
import Link from 'next/link'
import { Pagination } from './Pagination'

export function ItemsList({
  items,
  searchParams,
}: {
  items: Item[]
  searchParams: NextSearchParams
}) {
  const paginatedResults = getPaginatedResults(items, searchParams)
  return (
    <>
      <ul className="grid grid-cols-3 gap-8 mb-10">
        {paginatedResults.items.map((item) => {
          const url = `/revuedepresse/${item.id}`
          return (
            <li
              key={item.id}
              className="flex flex-col stretch justify-between bg-white px-4 pt-8 pb-8 text-black"
            >
              <div>
                {item.date ? (
                  <p className="mb-2">{formatDateVerbose(item.date)}</p>
                ) : null}
                <h2 className="font-bold text-2xl mb-2">
                  <Link href={url}>{item.titre}</Link>
                </h2>
                <p className="mb-4">
                  {shorten(item.contenu, 200)}{' '}
                  <Link href={url} className="ml-2 underline">
                    Lire la suite&nbsp;→
                  </Link>
                </p>
              </div>
              <TagsList {...{ item }} />
            </li>
          )
        })}
      </ul>
      <Pagination {...{ paginatedResults }} />
    </>
  )
}

function TagsList({ item }: { item: Item }) {
  const categories = item.categorie.map((_) => ({
    ..._,
    kind: 'categories' as const,
  }))
  const departements = item.departement.map((_) => ({
    ..._,
    kind: 'departements' as const,
  }))
  const personnalites = item.personnalites.map((_) => ({
    ..._,
    kind: 'personnalites' as const,
  }))
  const personnes_morales = item.personnes_morales.map((_) => ({
    ..._,
    kind: 'personnes_morales' as const,
  }))

  const tags: { id: number; value: string; kind: TagKind }[] = [
    ...categories,
    ...departements,
    ...personnalites,
    ...personnes_morales,
  ]

  return (
    <ul className="list-none flex flex-wrap gap-2">
      {tags.map((_, idx) => {
        const val = typeof _ === 'string' ? _ : _.value
        return (
          <li key={`${val}_${idx}`} className="bg-rose-200 px-2 rounded">
            <Link href={`/revuedepresse/tag/${_.kind}/${_.id}`}>
              {shorten(val, 30)}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

function shorten(s: string, limit: number) {
  if (s.length <= limit) return s
  return s.slice(0, limit) + `...`
}
