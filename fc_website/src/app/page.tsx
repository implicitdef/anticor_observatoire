import { LinkToItem } from '@/components/LinkToItem'
import { TagsList } from '@/components/TagsList'
import { Item, getData } from '@/lib/dataReader'
import {
  firstOfArray,
  formatDateVerbose,
  getItemsWithSameTag,
  readTagsOfItem,
} from '@/lib/utils'
import Link from 'next/link'
import lo from 'lodash'

const MAX_BY_BANDEAU = 3

export default function Home() {
  const allItems = getData()
  const aLaUneItem = firstOfArray(allItems.filter((_) => _.a_la_une))

  const fiveLatestActus = allItems
    .filter((_) => _.categorie.some((_) => _.value === 'Actualité'))
    .slice(0, 5)

  const itemsFromTagRelatedToUne = prepareItemsRelatedToALaUne(
    aLaUneItem,
    allItems,
  )

  // DOUBLON avec les actus vues plus haut
  const itemsActualites = allItems
    .filter((_) => _.categorie.some((_) => _.value === 'Actualité'))
    .slice(0, MAX_BY_BANDEAU)
  const itemProbite = allItems
    .filter((_) =>
      _.categorie.some((_) => _.value === 'Observatoire de la probité'),
    )
    .slice(0, MAX_BY_BANDEAU)
  const itemsPantouflages = allItems
    .filter((_) =>
      _.categorie.some((_) => _.value === 'Observatoire des pantouflages'),
    )
    .slice(0, MAX_BY_BANDEAU)
  const itemsCondamnations = allItems
    .filter((_) => _.procedure.some((_) => _.value === 'Condamnation'))
    .slice(0, MAX_BY_BANDEAU)

  return (
    <div className=" w-full pt-8">
      {aLaUneItem && <ALaUneBanner item={aLaUneItem} />}
      <LatestActus items={fiveLatestActus} />
      {itemsFromTagRelatedToUne && (
        <ItemsBanner
          title={`Sur le même sujet : ${itemsFromTagRelatedToUne.tag.value}`}
          items={itemsFromTagRelatedToUne.items}
        />
      )}
      <ItemsBanner title="Actualités" items={itemsActualites} />
      <ItemsBanner title="Probité" items={itemProbite} />
      <ItemsBanner title="Pantouflages" items={itemsPantouflages} />
      <ItemsBanner title="Condamnations" items={itemsCondamnations} />
    </div>
  )
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
    <div className="container mx-auto mb-8 mt-8">
      <LinkToItem
        {...{ item }}
        className="block bg-bleuanticor-500 text-white py-16 px-40"
      >
        <h1 className="font-bold text-3xl text-left mb-2">
          <span className="text-bleuanticor-200">À LA UNE :</span>{' '}
          <span className="">{item.titre}</span>{' '}
        </h1>
        <p className="text-base uppercase text-bleuanticor-100 font-normal mb-2">
          Le 8 février 2024
        </p>
        <p className="text-bleuanticor-100 text-lg text-left">{item.contenu}</p>
      </LinkToItem>
    </div>
  )
}

function LatestActus({ items }: { items: Item[] }) {
  return (
    <div className="container mx-auto flex flex-wrap gap-8 items-center justify-center mb-12">
      {items.map((item) => {
        return (
          <LinkToItem
            item={item}
            key={item.id}
            className="font-bold underline text-bleuanticor-500"
          >
            {item.titre.slice(0, 50) + '...'}
          </LinkToItem>
        )
      })}
    </div>
  )
}

function ItemsBanner({ items, title }: { items: Item[]; title: string }) {
  return (
    <div className="container mx-auto mb-4">
      <h2 className="text-base mb-4 text-left text-bleuanticor-400 uppercase">
        {title}
      </h2>
      <ul className="grid grid-cols-3 gap-6">
        {items.map((item, idx) => {
          return (
            <li key={item.id}>
              <LinkToItem
                {...{ item }}
                className="bg-gray-100 border-bleuanticor-100 border-l-4 border-0 pt-6 pb-8 px-8 block h-full "
              >
                {item.date && (
                  <div className="text-sm mb-1 uppercase">
                    {formatDateVerbose(item.date)}
                  </div>
                )}
                <div className="font-bold text-bleuanticor-500">
                  {item.titre}
                </div>
              </LinkToItem>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
