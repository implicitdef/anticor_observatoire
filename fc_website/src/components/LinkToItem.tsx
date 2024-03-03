import { Item } from '@/lib/dataReader'
import { buildUrlItem, buildUrlList } from '@/lib/urls'
import Link from 'next/link'
import { ReactNode } from 'react'

export function LinkToItem({
  item,
  children,
  className = '',
}: {
  item: Item
  children: ReactNode
  className?: string
}) {
  return (
    <Link href={buildUrlItem(item)} {...{ className }}>
      {children}
    </Link>
  )
}
