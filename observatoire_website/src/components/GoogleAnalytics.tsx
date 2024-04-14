'use client'
import Script from 'next/script'
import { useEffect } from 'react'

declare global {
  interface Window {
    dataLayer: any
    gtag: any
  }
}

export function GoogleAnalytics() {
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
