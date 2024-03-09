import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import 'remixicon/fonts/remixicon.css'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/img/logo.png'
import logoMastodon from '@/img/sociallogos/mastodon.svg'
import logoX from '@/img/sociallogos/x.svg'
import logoInstagram from '@/img/sociallogos/instagram.svg'
import logoFacebook from '@/img/sociallogos/facebook.svg'
import { buildUrlAPropos, buildUrlHome, buildUrlList } from '@/lib/urls'

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
            <div className="flex justify-between">
              <Logo />
              <SocialLinks />
            </div>
            <Menu />
          </div>
        </header>
        <main className="mx-auto grow w-full mb-10">{children}</main>
        <footer className="container mx-auto flex flex-col gap-2 items-center justify-center text-gray-700 mb-4 px-2">
          <p className="text-sm text-center">
            Sauf mention explicite d'une condamnation non susceptible d'appel,
            toutes les personnes mentionnées sur ce site sont présumées
            innocentes.
          </p>
          <Link
            href={
              'https://www.anticor.org/mentions-legales-et-politique-de-confidentialite/'
            }
            className="fc-link underline underline-offset-4 text-sm"
          >
            Mentions légales et politique de confidentialité
          </Link>
        </footer>
      </body>
    </html>
  )
}

function SocialLinks() {
  return (
    <div className="flex items-start">
      <div className="px-2 h-fit grid grid-cols-2 sm:grid-cols-4  gap-2 pt-2">
        <a target="_blank" href="https://piaille.fr/@francecorruption">
          <Image alt="Mastodon" src={logoMastodon} className="h-8 w-8" />
        </a>
        <a target="_blank" href="https://twitter.com/FR_corruption">
          <Image alt="X" src={logoX} className="h-7 w-7" />
        </a>
        <a target="_blank" href="https://www.instagram.com/francecorruption/">
          <Image alt="Instagram" src={logoInstagram} className="h-8 w-auto" />
        </a>
        <a target="_blank" href="https://www.facebook.com/FRcorruption/">
          <Image alt="Facebook" src={logoFacebook} className="h-8 w-auto" />
        </a>
      </div>
    </div>
  )
}

function Logo() {
  return (
    <Link
      href={buildUrlHome()}
      className="mt-2 ml-6 w-fit flex flex-col items-center"
    >
      <Image
        src={logo}
        width={130}
        height={61}
        alt="Logo de l'Observatoire, par Anticor"
      />
      <span className="uppercase font-bold text-xl bg-bleuanticor-500 px-2 mt-2 text-white tracking-tight bg-bleXuanticor-100">
        l'observatoire
      </span>
    </Link>
  )
}

function Menu() {
  return (
    <div className="p-4 flex items-center gap-4 uppercase">
      <Link href={buildUrlList()} className="">
        Revue de presse
      </Link>
      <Link href={buildUrlAPropos()} className="">
        À propos{' '}
      </Link>
    </div>
  )
}
