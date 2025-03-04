import { Component, Field, useEntity } from "@contember/interface";
import { Link2 } from "lucide-react";

export const WhatsappLink = Component(({text}: {text?: string}) => {
	const entity = useEntity()
	const link = entity.getField('whatsappLink').value?.toString() ?? ''
	const regex = /^(https?:\/\/[^\s]+)/

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

export const WhatsappLinkFromString = Component(({text, link}: {text?: string, link?: string}) => {
	link ??= ''
	const regex = /^(https?:\/\/[^\s]+)/

	if (link === '' || !regex.test(link)) {
		return <><Link2 className="h-4 w-4 mr-2 text-gray-400" /><p>WhatsApp link to be added</p></>
	} else {
		if(text){
			return <><Link2 className="h-4 w-4 mr-2 text-gray-400" /><a className='text-blue-500' href={link} target="_blank">{text}</a></>
		} else {
			return <><Link2 className="h-4 w-4 mr-2 text-gray-400" /><a className='text-blue-500' href={link} target="_blank">{link}</a></>
		}
	}
})

export const GetN2NLink = Component(({text}: {text?: string}) => {
	const entity = useEntity()
	const link = entity.getField('link').value?.toString() ?? ''
	const regex = /^(https?:\/\/[^\s]+)/

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

export const GetN2NLinkFromString = Component(({text, link}: {text?: string, link?: string}) => {
	link??=''
	const regex = /^(https?:\/\/[^\s]+)/

	if (link === '' || !regex.test(link)) {
		return null
	}
    if(text){
        return <a className='text-blue-500' href={link} target="_blank">{text}</a>
    } else {
        return <a className='text-blue-500' href={link} target="_blank">{link}</a>
    }
})

export const GoogleMapsLink = Component(() => {
	const entity = useEntity()
	const link = entity.getField('mapLink').value?.toString() ?? ''
	console.log(link)
	const regex = /^(https?:\/\/[^\s]+)/

	if (link === '' || !regex.test(link)) {
		return (<>{entity.getField('place')?.value?.toString()}</>)
	} else {
        return <a className='text-blue-500' href={link} target="_blank">{entity.getField('place')?.value?.toString()}</a>
    }
}, () => (
	<>
		<Field field="place" />
		<Field field="mapLink" />
	</>
))

export const GoogleMapsLinkFromString = Component(({place, link}: {place?: string, link?: string}) => {
	link ??= ''
	place ??= ''
	const regex = /^(https?:\/\/[^\s]+)/

	if (link === '' || !regex.test(link)) {
		return (<>{place}</>)
	} else {
        return <a className='text-blue-500' href={link} target="_blank">{place}</a>
    }
})