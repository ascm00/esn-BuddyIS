import { Component, Field, useEntity } from "@contember/interface";

export const WhatsappLink = Component(({text}: {text?: string}) => {
	const entity = useEntity()
	const link = entity.getField('whatsappLink').value?.toString() ?? ''
	const regex = /^(https?:\/\/).+\.\w+$/;

	if (link === '' || !regex.test(link)) {
		return null
	} else {
		if(text){
			return <a className='text-blue-500' href={link} target="_blank">{text}</a>
		} else {
			return <a className='text-blue-500' href={link} target="_blank">{link}</a>
		}
	}
}, () => (
    <>
        <Field field="whatsappLink" />
    </>
))

export const GetN2NLink = Component(({text}: {text?: string}) => {
	const entity = useEntity()
	const link = entity.getField('link').value?.toString() ?? ''
	const regex = /^(https?:\/\/).+\.\w+$/;

	if (link === '' || !regex.test(link)) {
		return null
	}
    if(text){
        return <a className='text-blue-500' href={link} target="_blank">{text}</a>
    } else {
        return <a className='text-blue-500' href={link} target="_blank">{link}</a>
    }
}, () => (
	<>
		<Field field="link" />
	</>
))