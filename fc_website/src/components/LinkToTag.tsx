import { TagKind } from '@/app/revuedepresse/tag/[kind]/[id]/page'
import { buildUrlTag } from '@/lib/urls'
import Link from 'next/link'
import { ReactNode } from 'react'

export function LinkToTag({
  tag,
  children,
  className = '',
}: {
  tag: { id: number; value: string; kind: TagKind }
  children?: ReactNode
  className?: string
}) {
  return (
    <Link href={buildUrlTag(tag)} {...{ className }}>
      {children ?? tag.value}
    </Link>
  )
}
