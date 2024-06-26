import { LinkToItem } from '@/components/LinkToItem'
import { Item, getData } from '@/lib/dataReader'
import { buildUrlTag } from '@/lib/urls'
import {
  TypedTag,
  firstOfArray,
  formatDateVerbose,
  getItemsWithSameTag,
  readTagsOfItem,
  readTitre,
} from '@/lib/utils'
import lo from 'lodash'
import Link from 'next/link'

const MAX_BY_BANDEAU = 3

export default function Home() {
  const allItems = getData()

  const laUneItem = firstOfArray(allItems.filter((_) => _.a_la_une))

  const laUneRelatedTags = prepareTagsRelatedToLaUne(laUneItem, allItems)

  const itemsFromTagRelatedToUne = prepareItemsRelatedToALaUne(
    laUneItem,
    allItems,
  )

  // DOUBLON avec les actus vues plus haut
  const itemsActualites = allItems
    .filter((_) => _.categorie.some((_) => _.value === 'Actualité'))
    .slice(0, MAX_BY_BANDEAU)
  const itemProbite = allItems
    .filter((_) => _.categorie.some((_) => _.value === 'Probité'))
    .slice(0, MAX_BY_BANDEAU)
  const itemsPantouflages = allItems
    .filter((_) => _.categorie.some((_) => _.value === 'Pantouflages'))
    .slice(0, MAX_BY_BANDEAU)
  const itemsCondamnations = allItems
    .filter((_) => _.procedure.some((_) => _.value === 'Condamnation'))
    .slice(0, MAX_BY_BANDEAU)

  return (
    <div className="container mx-auto w-full pt-8 px-0 lg:px-4">
      {laUneItem && <ALaUneBanner item={laUneItem} />}
      <div className="px-4 lg:px-0">
        {itemsFromTagRelatedToUne && (
          <ItemsBanner
            title={`Sur le même sujet : ${itemsFromTagRelatedToUne.tag.value}`}
            items={itemsFromTagRelatedToUne.items}
          />
        )}
        {laUneRelatedTags && <RelatedTags tags={laUneRelatedTags} />}
        <ItemsBanner title="Actualités" items={itemsActualites} />
        <ItemsBanner title="Probité" items={itemProbite} />
        <ItemsBanner title="Pantouflages" items={itemsPantouflages} />
        <ItemsBanner title="Condamnations" items={itemsCondamnations} />
      </div>
    </div>
  )
}

function prepareTagsRelatedToLaUne(
  laUneItem: Item | undefined,
  allItems: Item[],
): TypedTag[] | undefined {
  if (laUneItem) {
    const eligibleTags = readTagsOfItem(laUneItem).filter(
      (_) => _.kind === 'personnalites' || _.kind === 'personnes_morales',
    )
    const withItems = eligibleTags.map((tag) => {
      const items = getItemsWithSameTag(allItems, tag).filter(
        (_) => _.id !== laUneItem.id,
      )
      return { tag, items }
    })
    const bestTags = lo
      .sortBy(withItems, (_) => -_.items.length)
      .slice(0, 5)
      .map((_) => _.tag)
    return bestTags
  }
  return undefined
}

function prepareItemsRelatedToALaUne(
  aLaUneItem: Item | undefined,
  allItems: Item[],
) {
  if (aLaUneItem) {
    const eligibleTags = readTagsOfItem(aLaUneItem).filter(
      (_) => _.kind === 'personnalites' || _.kind === 'personnes_morales',
    )
    const withItems = eligibleTags.map((tag) => {
      const items = getItemsWithSameTag(allItems, tag).filter(
        (_) => _.id !== aLaUneItem.id,
      )
      return { tag, items }
    })
    const best = firstOfArray(lo.sortBy(withItems, (_) => -_.items.length))
    if (best) {
      return {
        ...best,
        items: best.items.slice(0, MAX_BY_BANDEAU),
      }
    }
  }
  return undefined
}

function ALaUneBanner({ item }: { item: Item }) {
  return (
    <div className="mb-8 mt-8">
      <LinkToItem
        {...{ item }}
        className="block bg-bleuanticor-500 text-white py-16 px-4 sm:px-10 md:px-24 lg:px-40"
      >
        <h1 className="font-bold text-3xl text-left mb-2">
          <span className="text-bleuanticor-200">À LA UNE :</span>{' '}
          <span className="">{readTitre(item)}</span>{' '}
        </h1>
        <p className="text-base uppercase text-bleuanticor-100 font-normal mb-2">
          Le {formatDateVerbose(item.date)}
        </p>
        <p className="text-bleuanticor-100 text-lg text-left">{item.contenu}</p>
      </LinkToItem>
    </div>
  )
}

function RelatedTags({ tags }: { tags: TypedTag[] }) {
  return (
    <div className="mt-12">
      <div className="flex flex-wrap gap-4 items-center justify-center mb-12">
        <span className="text-bleuanticor-500 font-bold py-1 text-lg">
          voir aussi :
        </span>
        {tags.map((tag) => {
          return (
            <Link
              href={buildUrlTag(tag)}
              className="underline decoration-2 rounded-2xl text-bleuanticor-500 bg-bleuanticor-100 font-bold px-3 py-1 text-lg"
              key={tag.id}
            >
              {tag.value}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

function ItemsBanner({ items, title }: { items: Item[]; title: string }) {
  if (items.length > 0) {
    return (
      <div className="mb-4">
        <h2 className="text-base mb-4 text-left text-bleuanticor-400 uppercase">
          {title}
        </h2>
        <ul className="grid lg:grid-cols-3 gap-0 lg:gap-6">
          {items.map((item, idx) => {
            return (
              <li key={item.id}>
                <LinkToItem
                  {...{ item }}
                  className="bg-gray-100 border-bleuanticor-200 lg:border-bleuanticor-100 lg:border-l-4 border-b-2 lg:border-b-0 border-0 pt-6 pb-8 px-8 block h-full"
                >
                  {item.date && (
                    <div className="text-sm mb-1 uppercase">
                      {formatDateVerbose(item.date)}
                    </div>
                  )}
                  <div className="font-bold text-bleuanticor-500">
                    {readTitre(item)}
                  </div>
                </LinkToItem>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
  return null
}
