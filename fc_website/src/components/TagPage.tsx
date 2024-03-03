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
import Link from 'next/link'
import { notFound } from 'next/navigation'

export type TagKind =
  | 'categories'
  | 'departements'
  | 'personnalites'
  | 'personnes_morales'
  | 'procedure'
  | 'theme'

type TagPageKind = 'departement' | 'country' | 'other'

export function TagPage({
  tagPageKind,
  tagPathParam,
  searchParams,
}: {
  tagPageKind: TagPageKind
  tagPathParam: string
  searchParams: NextSearchParams
}) {
  const allItems = getData()
  const tag = identifyTag({ allItems, tagPageKind, tagPathParam })
  if (!tag) {
    return notFound()
  }
  const items = getItemsWithSameTag(allItems, tag)
  return (
    <div className="container px-4 py-28 mx-auto">
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
  allItems,
}: {
  tagPageKind: TagPageKind
  tagPathParam: string
  allItems: Item[]
}): TypedTag | undefined {
  const allTags = uniqBy(allItems.flatMap(readTagsOfItem), (_) => _.id)
  // This is the reverse of the logic in urls.ts
  if (tagPageKind === 'country') {
    return allTags.find((_) => {
      if (hasKindDepartements(_)) {
        const res = identifyDepartementsTagForUrl(_)
        if (res.kind === 'country') {
          return slugify(res.name) === tagPathParam
        }
      }
    })
  }
  if (tagPageKind === 'departement') {
    return allTags.find((_) => {
      if (hasKindDepartements(_)) {
        const res = identifyDepartementsTagForUrl(_)
        if (res.kind === 'departement') {
          return res.number === tagPathParam
        }
      }
    })
  }
  return allTags.find((_) => {
    if (!hasKindDepartements(_)) {
      return slugify(_.value) === tagPathParam
    }
  })
}
