import { Item } from '@/lib/dataReader'
import Link from 'next/link'
import { ReactNode } from 'react'

export function LinkToItem({
  item,
  children,
  className = ''
}: {
  item: Item
  children: ReactNode
  className?: string
}) {
  const url = `/revuedepresse/${item.id}`

  return <Link href={url} {...{className}}>{children}</Link>
}
