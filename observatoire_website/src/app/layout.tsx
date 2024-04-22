import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import logo from '@/img/logo.png'
import logoFacebook from '@/img/sociallogos/facebook.svg'
import logoInstagram from '@/img/sociallogos/instagram.svg'
import logoMastodon from '@/img/sociallogos/mastodon.svg'
import logoX from '@/img/sociallogos/x.svg'
import { buildUrlAPropos, buildUrlHome, buildUrlList } from '@/lib/urls'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import 'remixicon/fonts/remixicon.css'
import './globals.css'

const openSans = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: `Observatoire - Anticor`,
  description: `L'observatoire d'Anticor publie une revue de presse aussi exhaustive que possible des actualités liées à la corruption en France, au niveau national et local. Une initiative de bénévoles de l'association de lutte anticorruption Anticor.`,
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
          <GoogleAnalytics />
        </header>
        <main className="mx-auto grow w-full mb-10">{children}</main>
        <footer className="container mx-auto flex flex-col gap-4 items-center justify-center text-gray-700 mb-10 px-2">
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
        priority
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
