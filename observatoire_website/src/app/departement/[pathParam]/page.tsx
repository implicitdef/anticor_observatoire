import {
  buildTagPageFinal,
  buildTagPageGenerateMetadata,
} from '@/components/TagPage'

const tagPageKind = 'departement'

export const generateMetadata = buildTagPageGenerateMetadata({ tagPageKind })

const Page = buildTagPageFinal({ tagPageKind })
export default Page
