import { NextSearchParams } from '@/app/revuedepresse/page'
import { ItemsList } from '@/components/ItemsList'
import { Item, getData } from '@/lib/dataReader'
import { buildUrlList } from '@/lib/urls'
import {
  TypedTag,
  getItemsWithSameTag,
  hasKindDepartements,
  identifyDepartementsTagForUrl,
  readTagsOfItem,
  slugify,
} from '@/lib/utils'
import uniqBy from 'lodash/uniqBy'
import { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type TagPageKind = 'departement' | 'country' | 'other'

type Props = {
  params: LocalParams
  searchParams: NextSearchParams
}

type LocalParams = {
  pathParam: string
}

export function buildTagPageGenerateMetadata({
  tagPageKind,
}: {
  tagPageKind: TagPageKind
}) {
  return async function tagPageGenerateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata,
  ): Promise<Metadata> {
    const { tag } = identifyTag({ tagPageKind, tagPathParam: params.pathParam })
    if (tag) {
      return { title: `${tag.value} - Observatoire - Anticor` }
    }
    return {}
  }
}

export function buildTagPageFinal({
  tagPageKind,
}: {
  tagPageKind: TagPageKind
}) {
  return function TagPageFinal({ params, searchParams }: Props) {
    return (
      <TagPage
        tagPathParam={params.pathParam}
        {...{ searchParams, tagPageKind }}
      />
    )
  }
}

function TagPage({
  tagPageKind,
  tagPathParam,
  searchParams,
}: {
  tagPageKind: TagPageKind
  tagPathParam: string
  searchParams: NextSearchParams
}) {
  const { tag, allItems } = identifyTag({ tagPageKind, tagPathParam })
  if (!tag) {
    return notFound()
  }
  const items = getItemsWithSameTag(allItems, tag)
  return (
    <div className="container  py-28 mx-auto">
      <h1 className="text-2xl font-bold mb-10 text-gray-700 text-center">
        <Link href={buildUrlList()} className="underline">
          La revue de presse
        </Link>
        {tag && (
          <>
            {' > '}
            <span className="font-normal ">{tag.value}</span>
          </>
        )}
      </h1>
      <ItemsList {...{ items, searchParams }} />
    </div>
  )
}

function identifyTag({
  tagPageKind,
  tagPathParam,
}: {
  tagPageKind: TagPageKind
  tagPathParam: string
}): { allItems: Item[]; tag: TypedTag | undefined } {
  const allItems = getData()
  const allTags = uniqBy(allItems.flatMap(readTagsOfItem), (_) => _.id)
  // This is the reverse of the logic in urls.ts
  const tag =
    tagPageKind === 'country'
      ? allTags.find((_) => {
          if (hasKindDepartements(_)) {
            const res = identifyDepartementsTagForUrl(_)
            if (res.kind === 'country') {
              return slugify(res.name) === tagPathParam
            }
          }
        })
      : tagPageKind === 'departement'
        ? allTags.find((_) => {
            if (hasKindDepartements(_)) {
              const res = identifyDepartementsTagForUrl(_)
              if (res.kind === 'departement') {
                return res.number === tagPathParam
              }
            }
          })
        : allTags.find((_) => {
            if (!hasKindDepartements(_)) {
              return slugify(_.value) === tagPathParam
            }
          })
  return { allItems, tag }
}
