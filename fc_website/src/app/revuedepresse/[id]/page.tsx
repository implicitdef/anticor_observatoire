import { getData } from '@/lib/dataReader'
import { formatDateVerbose } from '@/lib/utils'
import Link from 'next/link'
import { NextSearchParams } from '../page'
import { notFound } from 'next/navigation'
import { ItemFiche } from '@/components/ItemFiche'
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
      <div className="bg-blue-100 mt-28">
        <div className="flex flex-col stretch justify-between bg-white px-4 pt-8 pb-8 text-black">
          <div>
            {item.date ? (
              <p className="mb-4 text-center">{formatDateVerbose(item.date)}</p>
            ) : null}
            <h1 className="font-bold text-4xl mb-8">{item.titre}</h1>
            <p className="mb-4 ">{item.contenu}</p>
            <p className="mb-10">
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
