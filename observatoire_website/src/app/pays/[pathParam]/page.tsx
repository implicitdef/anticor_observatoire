import {
  buildTagPageFinal,
  buildTagPageGenerateMetadata,
} from '@/components/TagPage'

const tagPageKind = 'country'

export const generateMetadata = buildTagPageGenerateMetadata({ tagPageKind })

const Page = buildTagPageFinal({ tagPageKind })
export default Page
