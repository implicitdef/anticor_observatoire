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
import { LinkToItem } from '@/components/LinkToItem'
import { LinkToTag } from '@/components/LinkToTag'

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
  const allItems = getData()
  const item = allItems.find((_) => _.id === itemId)

  if (item) {
    return (
      <div className="container mt-28 mx-auto">
        <MainFiche item={item} />
        <div className="flex flex-col space-y-8 mb-8">
          {getSimilarItems(item, allItems).map(({ tag, items }) => {
            return (
              <div className="">
                <h3 className="text-xl mb-2">
                  <LinkToTag
                    {...{ tag }}
                    className="bg-rose-200 px-2 rounded"
                  />
                </h3>
                <ul className="flex gap-6 items-stretch">
                  {items.map((item) => {
                    return (
                      <li key={item.id} className="">
                        <LinkToItem
                          {...{ item }}
                          className="bg-white pt-6 pb-8 px-8 block h-full"
                        >
                          {item.date && (
                            <div className="text-sm mb-1">
                              {formatDateVerbose(item.date)}
                            </div>
                          )}
                          <div className="font-bold">{item.titre}</div>
                        </LinkToItem>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
  return notFound()
}

function MainFiche({ item }: { item: Item }) {
  return (
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
  )
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
