import { PaginatedResults } from '@/lib/pagination'
import Link from 'next/link'

export function Pagination({
  paginatedResults,
}: {
  paginatedResults: PaginatedResults
}) {
  const { allPages, currentPage } = paginatedResults
  const nearbyFactor = 2

  function isNearCurrentPage(page: number) {
    return Math.abs(page - currentPage) <= nearbyFactor
  }
  const firstPage = allPages[0]
  const lastPage = allPages[allPages.length - 1]

  const isNearStart = isNearCurrentPage(firstPage)
  const isNearEnd = isNearCurrentPage(lastPage)

  const previousLink =
    currentPage > firstPage ? (
      <PaginationRelativeLink page={currentPage - 1} kind="previous" />
    ) : null

  const firstPart = isNearStart ? null : (
    <>
      <PaginationLink page={firstPage} />
      <PaginationEllipsis />
    </>
  )

  const middlePart = allPages
    .filter(isNearCurrentPage)
    .map((page) => (
      <PaginationLink key={page} page={page} isCurrent={page === currentPage} />
    ))

  const lastPart = isNearEnd ? null : (
    <>
      <PaginationEllipsis />
      <PaginationLink page={lastPage} />
    </>
  )

  const nextLink =
    currentPage < lastPage ? (
      <PaginationRelativeLink page={currentPage + 1} kind="next" />
    ) : null
  return (
    <div className="grid grid-cols-2 lg:flex lg:justify-between">
      <ul className="col-span-2 lg:order-2 flex gap-2 justify-center mb-2">
        {firstPart}
        {middlePart}
        {lastPart}
      </ul>
      <div className=" lg:order-1 flex justify-start">{previousLink}</div>
      <div className=" lg:order-3 flex justify-end"> {nextLink}</div>
    </div>
  )
}

function PaginationLink({
  page,
  isCurrent = false,
}: {
  page: number
  isCurrent?: boolean
}) {
  return (
    <li>
      <Link
        href={`?page=${page}`}
        className={`block py-2 px-4 ${
          isCurrent
            ? 'text-white bg-red-700'
            : 'text-slate-800 hover:bg-slate-300'
        }`}
      >
        {page}
      </Link>
    </li>
  )
}

function PaginationRelativeLink({
  page,
  kind,
}: {
  page: number
  kind: 'next' | 'previous'
}) {
  return (
    <Link
      className={` bg-slate-300 flex items-center p-2 border border-slate-400 text-slate-700 `}
      href={`?page=${page}`}
    >
      {kind === 'previous' ? (
        <>
          <i className="mr-2 ri-arrow-left-line" /> Page précédente
        </>
      ) : (
        <>
          Page suivante <i className="ml-2 ri-arrow-right-line" />
        </>
      )}
    </Link>
  )
}

function PaginationEllipsis() {
  return <li className="flex items-end py-2 px-4">...</li>
}
