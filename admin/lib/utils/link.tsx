import { Component, Field, useEntity } from "@contember/interface";

export const WhatsappLink = Component(() => {
	const entity = useEntity()
	const link = entity.getField('whatsappLink').value?.toString() ?? ''
	if (link === '') {
		return null
	} else {
		return <a className='text-blue-500' href={link} target="_blank">{link}</a>
	}
}, () => (
    <>
        <Field field="whatsappLink" />
    </>
))

export const GetN2NLink = Component(() => {
	const entity = useEntity()
	const link = entity.getField('link').value?.toString() ?? ''

	if(link === '') {
		return null
	}
	return <a className='text-blue-500' href={link} target="_blank">{link}</a>
}, () => (
	<>
		<Field field="link" />
	</>
))