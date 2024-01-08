import { getData } from '@/lib/dataReader'
import { formatDateVerbose } from '@/lib/utils'
import Link from 'next/link'

export default function Fiche() {
  const item = getData()[0]
  return (
    <div className="px-4 py-28">
      {/* <h1 className="text-6xl font-bold mb-10">
        Liste des items de la revue de presse
      </h1> */}

      <div className=" bg-white px-4 py-8 text-zinc-700">
        {item.date ? (
          <p className="pb-8">{formatDateVerbose(item.date)}</p>
        ) : null}
        <h1 className="font-bold text-4xl pb-8 ">{item.titre}</h1>
        <p className="pb-8">{item.contenu}</p>
        <p>
          Source :{' '}
          <Link href={item.url} target="_blank" className="fc-link">
            {item.url}{' '}
            <i className="ri-external-link-line" aria-hidden="true" />
          </Link>
        </p>
      </div>
    </div>
  )
}
