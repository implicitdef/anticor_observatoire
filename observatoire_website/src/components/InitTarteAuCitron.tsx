export function InitTarteAuCitron() {
  return (
    <>
      {/*
        Tarte au citron s'attend à ce que ces scripts soient asynchrones et directement en haut de la page, etc.
        La lib est capricieuse, si on essaie de faire plus propre il n'y a plus rien qui marche
      */}
      {/* eslint-disable @next/next/no-sync-scripts */}
      <script src="/tarteaucitron/tarteaucitron.js"></script>
      <script src="/tarteaucitroninit.js"></script>
    </>
  )
}
