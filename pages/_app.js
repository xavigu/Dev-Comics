import { NextUIProvider } from '@nextui-org/react'
import { I18nProvider } from 'context/i18n'
import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <I18nProvider>
      <NextUIProvider>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </NextUIProvider>
    </I18nProvider>
  )
}

export default MyApp
