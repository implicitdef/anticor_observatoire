window.tarteaucitron.init({
  privacyUrl:
    'https://www.anticor.org/mentions-legales-et-politique-de-confidentialite/' /* Privacy policy url */,
  bodyPosition:
    'bottom' /* or top to bring it as first element for accessibility */,

  hashtag: '#tarteaucitron' /* Open the panel with this hashtag */,
  cookieName: 'tarteaucitron' /* Cookie name */,

  orientation: 'bottom' /* Banner position (top - bottom - middle - popup) */,

  groupServices: false /* Group services by category */,
  showDetailsOnClick: true /* Click to expand the description */,
  serviceDefaultState: 'wait' /* Default state (true - wait - false) */,

  showAlertSmall: false /* Show the small banner on bottom right */,
  cookieslist: false /* Show the cookie list */,

  showIcon: true /* Show cookie icon to manage cookies */,
  // "iconSrc": "", /* Optional: URL or base64 encoded image */
  iconPosition:
    'BottomRight' /* Position of the icon between BottomRight, BottomLeft, TopRight and TopLeft */,

  adblocker: false /* Show a Warning if an adblocker is detected */,

  DenyAllCta: true /* Show the deny all button */,
  AcceptAllCta: true /* Show the accept all button when highPrivacy on */,
  highPrivacy: true /* HIGHLY RECOMMANDED Disable auto consent */,

  handleBrowserDNTRequest: false /* If Do Not Track == 1, disallow all */,

  removeCredit: false /* Remove credit link */,
  moreInfoLink: true /* Show more info link */,
  useExternalCss: false /* If false, the tarteaucitron.css file will be loaded */,
  useExternalJs: false /* If false, the tarteaucitron.services.js file will be loaded */,

  // "cookieDomain": ".my-multisite-domaine.fr", /* Shared cookie for subdomain website */

  readmoreLink:
    '' /* Change the default readmore link pointing to tarteaucitron.io */,

  mandatory: true /* Show a message about mandatory cookies */,
  mandatoryCta: true /* Show the disabled accept button when mandatory on */,

  // "customCloserId": "", /* Optional a11y: Custom element ID used to open the panel */

  googleConsentMode: true /* Enable Google Consent Mode v2 for Google ads and GA4 */,

  partnersList: false /* Details the number of partners on the popup and middle banner */,
})

// Lancement de Google Analytics, d'après le snippet donné par le site web de TarteAuCitron
window.tarteaucitron.user.gtagUa = 'G-487EDBV4RT'
// tarteaucitron.user.gtagCrossdomain = ['example.com', 'example2.com'];
window.tarteaucitron.user.gtagMore = function () {
  /* add here your optionnal gtag() */
}
;(window.tarteaucitron.job = window.tarteaucitron.job || []).push('gtag')
