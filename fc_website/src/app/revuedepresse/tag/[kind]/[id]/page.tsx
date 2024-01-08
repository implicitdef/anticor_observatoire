import { NextSearchParams } from '@/app/revuedepresse/page'
import { ItemsList } from '@/components/ItemsList'
import { getData } from '@/lib/dataReader'

export type TagKind =
  | 'categories'
  | 'departements'
  | 'personnalites'
  | 'personnes_morales'

type LocalParams = {
  kind: TagKind
  id: string
}

export default function TagPage({
  params,
  searchParams,
}: {
  params: LocalParams
  searchParams: NextSearchParams
}) {
  const items = getData().filter((_) => {
    const id = parseInt(params.id, 10)
    switch (params.kind) {
      case 'categories':
        return _.categorie.some((_) => _.id === id)
      case 'departements':
        return _.departement.some((_) => _.id === id)
      case 'personnalites':
        return _.personnalites.some((_) => _.id === id)
      case 'personnes_morales':
        return _.personnes_morales.some((_) => _.id === id)
    }
  })
  return (
    <div className="px-4 py-28">
      <h1 className="text-2xl font-bold mb-10 text-zinc-700 text-center">
        La revue de presse
      </h1>
      <ItemsList {...{ items, searchParams }} />
    </div>
  )
}
