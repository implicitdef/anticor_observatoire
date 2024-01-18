import { TagsList } from '@/components/TagsList'
import { Item, getData } from '@/lib/dataReader'
import Link from 'next/link'

export default function Home() {
  const allItems = getData()
  return (
    <div className="w-full">
      <div className="container mx-auto mt-10 mb-40">
        <h1 className="text-6xl font-bold mb-10">
          Page d'accueil France Corruption
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <ItemsBanner
        color="bg-red-700"
        title="Probité"
        items={allItems
          .filter((_) =>
            _.categorie.some((_) => _.value === 'Observatoire de la probité'),
          )
          .slice(0, 4)}
      />
      <ItemsBanner
        smaller
        color="bg-cyan-600"
        title="Actualités"
        items={allItems
          .filter((_) => _.categorie.some((_) => _.value === 'Actualité'))
          .slice(0, 4)}
      />
      <ItemsBanner
        color="bg-indigo-700"
        title="Concernant Anticor"
        items={allItems
          .filter((_) => _.personnes_morales.some((_) => _.value === 'Anticor'))
          .slice(0, 4)}
      />
      <ItemsBanner
        smaller
        color="bg-red-500"
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

function ItemsBanner({
  items,
  color,
  title,
  smaller = false,
}: {
  items: Item[]
  color: string
  title: string
  smaller?: boolean
}) {
  return (
    <div
      className={` ${
        smaller ? 'pt-6 pb-10 text-center' : 'pt-10  pb-32'
      } ${color}`}
    >
      <div className="container mx-auto">
        <h2 className="text-4xl mb-8 text-white">{title}</h2>
        <ul className="flex gap-6">
          {items.map((item, idx) => {
            const url = `/revuedepresse/${item.id}`

            return (
              <li
                key={item.id}
                className="bg-white font-bold p-2 min-h-[150px] flex items-center justify-center"
              >
                <Link href={url}>{item.titre}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
