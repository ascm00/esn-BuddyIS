import { useEffect } from 'react'
import { Component, useField } from '@contember/interface'
import { CheckboxField, CheckboxFieldProps } from '@app/lib/form'
import { usePersistWithFeedback } from '@app/lib/binding'

export const PersistCheckbox = Component((props: CheckboxFieldProps) => {
	const field = useField(props.field)
	const persist = usePersistWithFeedback()
	useEffect(() => {
		if (field.value !== field.valueOnServer) {
			persist()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [field.value, field.valueOnServer])
	return (<CheckboxField {...props} />)
}, (props: CheckboxFieldProps) => (
	<CheckboxField {...props} />
), 'PersistCheckbox')