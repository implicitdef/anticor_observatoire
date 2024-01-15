import { ItemsList } from '@/components/ItemsList'
import { getData } from '@/lib/dataReader'

export type NextSearchParams = { [key: string]: string | string[] | undefined }

export default function RevueDePresse({
  searchParams,
}: {
  params: unknown
  searchParams: NextSearchParams
}) {
  const items = getData()
  return (
    <div className="container px-4 py-28 mx-auto">
      <h1 className="text-2xl font-bold mb-10 text-zinc-700 text-center">
        La revue de presse
      </h1>
      <ItemsList {...{ items, searchParams }} />
    </div>
  )
}
