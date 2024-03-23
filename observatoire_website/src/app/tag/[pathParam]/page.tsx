import { NextSearchParams } from '@/app/revuedepresse/page'
import { TagPage } from '@/components/TagPage'

type LocalParams = {
  pathParam: string
}

export default function PaysPage({
  params,
  searchParams,
}: {
  params: LocalParams
  searchParams: NextSearchParams
}) {
  return (
    <TagPage
      tagPageKind="other"
      tagPathParam={params.pathParam}
      {...{ searchParams }}
    />
  )
}
