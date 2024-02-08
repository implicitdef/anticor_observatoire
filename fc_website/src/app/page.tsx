import { LinkToItem } from '@/components/LinkToItem'
import { TagsList } from '@/components/TagsList'
import { Item, getData } from '@/lib/dataReader'
import { firstOfArray, formatDateVerbose } from '@/lib/utils'
import Link from 'next/link'

export default function Home() {
  const allItems = getData()
  const aLaUneItem = firstOfArray(allItems.filter((_) => _.a_la_une))

  const fiveLatestActus = allItems
    .filter((_) => _.categorie.some((_) => _.value === 'Actualité'))
    .slice(0, 5)

  return (
    <div className=" w-full pt-8">
      {aLaUneItem && <ALaUneBanner item={aLaUneItem} />}
      <LatestActus items={fiveLatestActus} />
      <ItemsBanner
        title="Probité"
        items={allItems
          .filter((_) =>
            _.categorie.some((_) => _.value === 'Observatoire de la probité'),
          )
          .slice(0, 4)}
      />
      <ItemsBanner
        title="Actualités"
        items={allItems
          .filter((_) => _.categorie.some((_) => _.value === 'Actualité'))
          .slice(0, 4)}
      />
      <ItemsBanner
        title="Concernant Anticor"
        items={allItems
          .filter((_) => _.personnes_morales.some((_) => _.value === 'Anticor'))
          .slice(0, 4)}
      />
      <ItemsBanner
        title="Parti Socialiste (PS)"
        items={allItems
          .filter((_) =>
            _.personnes_morales.some(
              (_) => _.value === 'Parti Socialiste (PS)',
            ),
          )
          .slice(0, 4)}
      />
    </div>
  )
}

function LatestActus({ items }: { items: Item[] }) {
  return (
    <div className="container mx-auto flex flex-wrap gap-8 items-center justify-center mb-8">
      {items.map((item) => {
        return (
          <LinkToItem
            item={item}
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
      <h2 className="text-2xl mb-4 text-center">{title}</h2>
      <ul className="flex gap-6">
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

function ALaUneBanner({ item }: { item: Item }) {
  return (
    <div className="container mx-auto mb-8">
      <LinkToItem {...{ item }} className="grid grid-cols-2 w-full">
        <h2 className="p-8 font-bold bg-gray-600 min-h-[400px] h-full flex items-center justify-center uppercase text-4xl text-black">
          à la une :
        </h2>
        <div className="bg-gray-400 font-bold p-2 flex items-center justify-center text-2xl p-8">
          {item.titre}
        </div>
      </LinkToItem>
    </div>
  )
}
