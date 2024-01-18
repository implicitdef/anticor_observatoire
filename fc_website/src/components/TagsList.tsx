import { TagKind } from '@/app/revuedepresse/tag/[kind]/[id]/page'
import { Item } from '@/lib/dataReader'
import { shorten } from '@/lib/utils'
import Link from 'next/link'
import { LinkToTag } from './LinkToTag'

export function TagsList({ item }: { item: Item }) {
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
  const procedures = item.procedure.map((_) => ({
    ..._,
    kind: 'procedure' as const,
  }))
  const themes = item.theme.map((_) => ({
    ..._,
    kind: 'theme' as const,
  }))

  const tags: { id: number; value: string; kind: TagKind }[] = [
    ...categories,
    ...departements,
    ...personnalites,
    ...personnes_morales,
    ...procedures,
    ...themes,
  ]

  return (
    <ul className="list-none flex flex-wrap gap-2">
      {tags.map((_, idx) => {
        const val = typeof _ === 'string' ? _ : _.value
        return (
          <li key={`${val}_${idx}`}>
            <span className="bg-rose-200 px-2 rounded ">
              <LinkToTag tag={_}>{shorten(_.value, 30)}</LinkToTag>
            </span>
          </li>
        )
      })}
    </ul>
  )
}

export function SingleTag({
  tag,
}: {
  tag: { id: number; value: string; kind: TagKind }
}) {
  return (
    <span className="bg-rose-200 px-2 rounded ">
      <Link href={`/revuedepresse/tag/${tag.kind}/${tag.id}`}>
        {shorten(tag.value, 30)}
      </Link>
    </span>
  )
}
