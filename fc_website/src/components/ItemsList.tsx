import { NextSearchParams } from '@/app/revuedepresse/page'
import { Item } from '@/lib/dataReader'
import { getPaginatedResults } from '@/lib/pagination'
import { ItemFiche } from './ItemFiche'
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
          return <ItemFiche key={item.id} item={item} />
        })}
      </ul>
      <Pagination {...{ paginatedResults }} />
    </>
  )
}
