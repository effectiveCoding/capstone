import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React from 'react'
import { __api } from '../constants'

type HomeProps = {
	response: any
}

const Home = ({ response }: HomeProps) => {
	return <h1>{response?.message}</h1>
}

export const getServerSideProps: GetServerSideProps = async (
	ctx: GetServerSidePropsContext
) => {
	const getSecretMessage = await fetch(`${__api}/message`)

	const response = await getSecretMessage.json()

	return {
		props: {
			response
		}
	}
}

export default Home
