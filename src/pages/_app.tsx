import type { AppProps } from 'next/app'
import  '../styles/tailwind.css'
import GlobalStyle from '../styles/global'

import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <SessionProvider session={pageProps.session}> 
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </SessionProvider>
    </>
  )
}

export default MyApp
