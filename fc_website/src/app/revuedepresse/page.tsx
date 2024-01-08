import { Pagination } from '@/components/Pagination'
import { Item, getData } from '@/lib/dataReader'
import {
  SearchParams,
  getPaginatedResults,
  searchParamsSchema,
} from '@/lib/searchAndPagination'
import { formatDateVerbose } from '@/lib/utils'
import Link from 'next/link'

export default function RevueDePresse(props: {
  params: unknown
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const parsingRes = searchParamsSchema.safeParse(props.searchParams)
  const searchParams: SearchParams = parsingRes.success ? parsingRes.data : {}

  const paginatedResults = getPaginatedResults(getData(), searchParams)
  return (
    <div className="px-4 py-28">
      <h1 className="text-2xl font-bold mb-10 text-zinc-700 text-center">
        La revue de presse
      </h1>
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
    </div>
  )
}

function TagsList({ item }: { item: Item }) {
  return (
    <ul className="list-none flex flex-wrap gap-2">
      {[
        ...item.categorie,
        ...item.departement,
        ...item.personnalites,
        ...item.personnes_morales,
      ].map((_, idx) => {
        const val = typeof _ === 'string' ? _ : _.value
        return (
          <li key={`${val}_${idx}`} className="bg-rose-200 px-2 rounded">
            <Link href={`/revuedepresse/tag/${val}`}>{shorten(val, 30)}</Link>
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
