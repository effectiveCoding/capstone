import React, { ReactElement } from 'react'

import User from '../types/user'
import AuthenticationLayout from '../components/layouts/Authentication'
import { Form, Formik } from 'formik'
import Input from '../components/Input'
import { __api } from '../constants'
import { useRouter } from 'next/router'
import FieldErrors from '../types/field-errors'

const SignUpPage = () => {
	const router = useRouter()

	const initialValues: User = {
		name: '',
		email: '',
		username: '',
		password: '',
		confirmPassword: ''
	}

	return (
		<>
			<h1>Sign Up</h1>
			<Formik
				initialValues={initialValues}
				onSubmit={async (value, { setErrors }) => {
					const returnURL = router.query.return
					const request = await fetch(`${__api}/v1/account/signup`, {
						method: 'POST',
						headers: new Headers({
							'Content-Type': 'application/json'
						}),
						body: JSON.stringify(value)
					})

					const data = await request.json()

					if (request.status === 400 && Array.isArray(data?.message)) {
						const errorMap: Record<string, string> = {}

						data?.message.forEach(
							(msg: FieldErrors) => (errorMap[msg.field] = msg.message[0])
						)

						setErrors(errorMap)

						return errorMap
					}

					returnURL ? router.push(`${returnURL}`) : router.push('/')
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<br />
						<Input
							label="name"
							name="name"
							type={'text'}
							placeholder={'Fullname'}
						/>
						<br />
						<Input
							label="email"
							name="email"
							type={'text'}
							placeholder={'Email address'}
						/>
						<br />
						<Input
							label="username"
							name="username"
							type={'text'}
							placeholder={'Username'}
						/>
						<br />
						<Input
							label="password"
							name="password"
							type={'password'}
							placeholder={'Password'}
						/>
						<br />
						<Input
							label="confirmPassword"
							name="confirmPassword"
							type={'password'}
							placeholder={'Confirm Password'}
						/>
						<br />
						<button type={'submit'} disabled={isSubmitting}>
							Sign Up
						</button>
					</Form>
				)}
			</Formik>
		</>
	)
}

SignUpPage.pageLayout = (page: ReactElement) => (
	<AuthenticationLayout title={'Sign Up'}>{page}</AuthenticationLayout>
)

export default SignUpPage
