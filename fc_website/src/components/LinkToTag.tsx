import { TagKind } from '@/app/revuedepresse/tag/[kind]/[id]/page'
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
  const url = `/revuedepresse/tag/${tag.kind}/${tag.id}`

  return (
    <Link href={url} {...{ className }}>
      {children ?? tag.value}
    </Link>
  )
}
