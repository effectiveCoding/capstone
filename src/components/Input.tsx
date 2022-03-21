import { useField } from 'formik'
import React, { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	name: string
	label: string
}

const Input = ({ label, ...props }: InputProps) => {
	const [field, { error }] = useField(props)

	console.log('Input Component:', error)

	return (
		<>
			<label htmlFor={field.name}>{label}</label>
			<br />
			<input id={field.name} {...field} {...props} />
			<br />
			{error ? <p>{error}</p> : null}
		</>
	)
}

export default Input
