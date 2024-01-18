import { Item, getData } from '@/lib/dataReader'
import {
  formatDateVerbose,
  getItemsWithSameTag,
  readTagsOfItem,
} from '@/lib/utils'
import Link from 'next/link'
import { NextSearchParams } from '../page'
import { notFound } from 'next/navigation'
import { TagsList } from '@/components/TagsList'

type LocalParams = {
  id: string
}

export default function Fiche({
  params,
}: {
  params: LocalParams
  searchParams: NextSearchParams
}) {
  const itemId = parseInt(params.id, 10)
  const item = getData().find((_) => _.id === itemId)

  if (item) {
    return (
      <div className="container mt-28 mx-auto">
        <div className="flex flex-col stretch justify-between px-4 pt-8 pb-8 text-black max-w-5xl mx-auto">
          <div>
            {item.date ? (
              <p className="mb-4 text-center font-bold">
                {formatDateVerbose(item.date)}
              </p>
            ) : null}
            <h1 className="font-bold text-4xl mb-8">{item.titre}</h1>
            <p className="mb-4 ">{item.contenu}</p>
            <p className="mb-10">
              <i className="ri-article-line ri-lg mr-2" />
              Source :{' '}
              <Link href={item.url} target="_blank" className="fc-link">
                {item.url}{' '}
                <i className="ri-external-link-line" aria-hidden="true" />
              </Link>
            </p>
          </div>
          <div className="flex items-center justify-center">
            <TagsList {...{ item }} />
          </div>
        </div>
      </div>
    )
  }
  return notFound()
}

function getSimilarItems(item: Item, allItems: Item[]) {
  const tags = readTagsOfItem(item)
  const tagsWithItems = tags
    .map((tag) => {
      const items = getItemsWithSameTag(allItems, tag)
        // don't keep the same item
        .filter((_) => _.id !== item.id)
        // keep 3 items max
        .slice(0, 3)
      return { tag, items }
    })
    // don't keep tags with 0 other items
    .filter((_) => _.items.length)
  return tagsWithItems
}
