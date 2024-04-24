'use client'
import Script from 'next/script'
import { useEffect } from 'react'

declare global {
  interface Window {
    dataLayer: any
    gtag: any
  }
}

const ENABLE_GOOGLE_ANALYTICS = false

export function GoogleAnalytics() {
  return ENABLE_GOOGLE_ANALYTICS ? <GoogleAnalyticsImpl /> : null
}

function GoogleAnalyticsImpl() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || []
    window.gtag = function () {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', 'G-487EDBV4RT')
  }, [])
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-487EDBV4RT"
      />
    </>
  )
}
