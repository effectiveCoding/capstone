import React, { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps as NextAppProps } from 'next/app'

type PageLayout = NextPage & {
	pageLayout?: (page: ReactElement) => ReactNode
}

type AppProps = NextAppProps & {
	Component: PageLayout
}

const App = ({ Component, pageProps }: AppProps) => {
	const getLayout = Component.pageLayout ?? (page => page)
	return getLayout(<Component {...pageProps} />)
}

export default App
