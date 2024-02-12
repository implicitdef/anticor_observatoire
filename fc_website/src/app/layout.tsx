import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import 'remixicon/fonts/remixicon.css'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/img/logo.png'

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
          <div className="container mx-auto border-b-2 border-0 border-solid border-gray-400">
            <div className="flex justify-between pt-4">
              <Link href="/" className="flex flex-col items-center">
                <Image
                  src={logo}
                  width={130}
                  height={61}
                  alt="Logo de l'Observatoire, par Anticor"
                />
                <span className="font-bold text-2xl bg-bleuanticor-500 px-2 mt-2 text-white tracking-tight bg-bleXuanticor-100">
                  l'observatoire
                </span>
              </Link>
              <div className="bg-blue-300 min-w-[300px] m-4 flex items-center justify-center">
                social links...
              </div>
            </div>
            <div className="p-4 flex items-center gap-4 uppercase">
              <Link href={'/revuedepresse'} className="">
                Revue de presse
              </Link>
              <Link href={'/apropos'} className="">
                À propos{' '}
              </Link>
            </div>
          </div>
        </header>
        <main className="mx-auto grow w-full">{children}</main>
        <footer className="mt-10">
          <div className="container mx-auto p-4 flex justify-center gap-4 text-gray-700">
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
