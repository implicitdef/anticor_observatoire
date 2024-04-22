import { Metadata } from 'next'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

export const metadata: Metadata = {
  title: 'À propos - Observatoire - Anticor',
}

export default function Page() {
  return (
    <div className="container mx-auto">
      <div className="max-w-4xl mt-10 px-4 space-y-6 mx-auto ">
        <h1 className="text-5xl font-bold text-bleuanticor-500">À propos</h1>
        <p>
          L'observatoire Anticor est une initiative non partisane et bénévole
          éditée par des bénévoles de l'association de lutte anticorruption{' '}
          <QuickLink href="https://www.anticor.org/">Anticor</QuickLink>. Il
          tient depuis janvier 2021 une revue de presse aussi exhaustive que
          possible des faits d'actualité liés à la corruption en France, aussi
          bien au niveau national que local. L'observatoire vise plusieurs
          objectifs :
        </p>
        <ul className="list-disc disc list-inside space-y-2 px-8">
          <li>
            Offrir au grand public un portail centralisé et simple d'usage
            d'actualité sur les sujets liés à la corruption en France
          </li>
          <li>
            Souligner que la corruption est un problème politique important en
            France, qui s'illustre au quotidien et sape la confiance des
            citoyens dans l'action publique
          </li>
          <li>
            Fournir un outil d'appréciation de l'ampleur du problème en
            centralisant les données publiques sur le sujet et en les rendant
            accessibles au grand public
          </li>
          <li>
            Ouvrir des perspectives d'amélioration en relayant les mobilisations
            citoyennes, actions en justice et initiatives politiques qui
            cherchent à s'attaquer à la corruption.
          </li>
        </ul>
        <p>
          Notre observatoire renvoie toujours directement vers les articles de
          presse qui constituent ses sources. Pour signaler un article manquant
          à notre revue de presse, n'hésitez pas à passer par le formulaire de
          contact.
        </p>
        <p>
          Sauf mention explicite d'une condamnation non susceptible d'appel,
          toutes les personnes mentionnées sur ce site sont présumées
          innocentes.
        </p>
        <h2 className="text-3xl font-bold  text-bleuanticor-500">
          Section “pantouflages”
        </h2>
        <p>
          Le terme « pantouflage » désigne de manière familière le fait pour un
          haut fonctionnaire de quitter une fonction publique pour aller
          travailler dans une entreprise privée (on parle de « rétro-pantouflage
          » pour désigner le mouvement inverse). Les grandes entreprises privées
          sont friandes de ces recrues, débauchées pour leur connaissance
          parfaite des rouages de l'administration publique, mais aussi et
          surtout pour leur proximité avec les décideurs au plus haut sommet de
          l'État. Tous les cas de pantouflage ne constituent pas une infraction
          (prise illégale d'intérêt), mais beaucoup posent des problèmes
          éthiques et déontologiques liés au mélange des sphères privées et
          publiques, à la confusion entre l'intérêt général et des intérêts
          particuliers ou ceux de grandes entreprises.
        </p>
        <p>
          Pour explorer davantage le sujet des pantouflages, nous vous suggérons
          la lecture des livres <span className="italic">Les Voraces</span> de
          Vincent Jauvert (Robert Laffon, 2020),{' '}
          <span className="italic">La Caste</span> de Laurent Mauduit (La
          Découverte, 2018), <span className="italic">Les Infiltrés</span> de
          Matthieu Aron et Caroline Michel-Aguirre (Allary, 2022), ainsi que de
          cet{' '}
          <QuickLink href="https://www.alternatives-economiques.fr/hauts-fonctionnaires-preferent-prive/00079448">
            article d'Alternatives Économiques (2017)
          </QuickLink>{' '}
          et de{' '}
          <QuickLink href="https://www.lessurligneurs.eu/quest-ce-que-le-pantouflage-et-que-prevoit-la-loi/">
            celui-ci du collectif Les Surligneurs (2022)
          </QuickLink>
          .
        </p>
        <p>
          Notre décompte des cas de pantouflage dans la vie publique française
          est établi bénévolement, sur la base d'articles de presse, dont les
          références figurent en bas de chaque notice. Nous incluons les cas de
          personnalités qui ne sont pas statutairement fonctionnaires, lorsque
          leur situation relèvent d'un cas de « revolving door » (porte tambour
          en français), c'est-à-dire le phénomène de rotation de personnel entre
          un rôle de législateur et régulateur d'une part et un poste dans
          l'industrie affecté par ces mêmes législation et régulation d'autre
          part.
        </p>
        <h2 className="text-3xl font-bold  text-bleuanticor-500">
          Section “probité”
        </h2>
        <p>
          La section “probité” de notre observatoire se donne pour objectif de
          recenser les affaires d'atteinte à la probité, à différents stades :
          condamnations, mises en examen, enquêtes en cours et révélations dans
          la presse ne faisant pas encore l'objet d'une enquête. Les infractions
          constituant des atteintes à la probité sont la corruption, le
          favoritisme, la prise illégale d'intérêt, le recel, le trafic
          d'influence et le détournement de fonds publics. Notre observatoire se
          concentre sur les élus nationaux (Assemblée Nationale, Sénat,
          Parlement Européen) et locaux (régions, départements, villes), les
          membres du gouvernement, ainsi que les responsables de partis
          politiques. Notre décompte est établi bénévolement, sur la base
          d'articles de presse, dont les références figurent en bas de chaque
          notice.
        </p>
      </div>
    </div>
  )
}

function QuickLink(props: PropsWithChildren & { href: string }) {
  return <Link {...props} className=" text-bleuanticor-400" />
}
