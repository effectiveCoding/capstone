import React, { FunctionComponent } from 'react'
import Head from 'next/head'

type AuthenticationLayoutProps = {
	title?: string
}

const AuthenticationLayout: FunctionComponent<AuthenticationLayoutProps> = ({
	children,
	title
}) => {
	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<h1>Authentication</h1>
			{children}
		</>
	)
}

export default AuthenticationLayout
