import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import 'remixicon/fonts/remixicon.css'
import Link from 'next/link'

const openSans = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'France Corruption',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body
        className={`${openSans.className} bg-white min-h-screen flex flex-col`}
      >
        <header className="">
          <div className="container mx-auto border-b-4 border-0 border-solid border-blue-900">
            <div className="flex justify-between">
              <Link href="/">
                <div className="bg-bleuanticor-500 text-white p-4 m-4 font-bold">
                  LOGO
                </div>
              </Link>
              <div className="bg-blue-300 min-w-[300px] m-4 flex items-center justify-center">
                social links...
              </div>
            </div>
            <hr />
            <div className="p-4 flex items-center gap-4">
              navigation menu...{' '}
              <Link href={'/revuedepresse'} className="fc-link">
                Revue de presse
              </Link>
              <Link href={'/apropos'} className="fc-link">
                À propos{' '}
              </Link>
            </div>
          </div>
        </header>
        <main className="mx-auto grow w-full">{children}</main>
        <footer className="">
          <div className="container mx-auto p-4 border-t-[1px] border-0 border-solid border-gray-700 flex justify-center gap-4 text-gray-700">
            <Link href={'/mentionslegales'} className="fc-link">
              Mentions légales
            </Link>
            <Link href={'/politiquedeconfidentialite'} className="fc-link">
              Politique de confidentialité
            </Link>
          </div>
        </footer>
      </body>
    </html>
  )
}
