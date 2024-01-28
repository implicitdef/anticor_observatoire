import { Item } from '@/lib/dataReader'
import { formatDateVerbose, shorten } from '@/lib/utils'
import { LinkToItem } from './LinkToItem'
import { TagsList } from './TagsList'

export function ItemFiche({ item }: { item: Item }) {
  return (
    <li className="flex flex-col bg-bleuanticor text-white stretch justify-between px-4 pt-8 pb-8 ">
      <div>
        {item.date ? (
          <p className="mb-2">{formatDateVerbose(item.date)}</p>
        ) : null}
        <h2 className="font-bold text-2xl mb-2 ">
          <LinkToItem {...{ item }}>{item.titre}</LinkToItem>
        </h2>
        <p className="mb-4">
          {shorten(item.contenu, 200)}{' '}
          <LinkToItem {...{ item }} className="ml-2 underline">
            Lire la suite&nbsp;→
          </LinkToItem>
        </p>
      </div>
      <TagsList {...{ item }} />
    </li>
  )
}
