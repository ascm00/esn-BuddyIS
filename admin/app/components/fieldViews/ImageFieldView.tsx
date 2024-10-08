import { Component, Field, useField } from '@contember/interface'
import { ImageOff } from 'lucide-react'

export const ImageFieldView = Component(
	({ srcField, width, height }: { srcField?: string; width: number; height: number }) => {
		const src = srcField ?? 'picture.url'
		const imageUrl = useField<string>(src).value

		if (imageUrl === null || imageUrl === '') {
			return (
				<div className={`h-${height} w-${width} object-contain border rounded-lg bg-gray-100 flex items-center justify-around`}>
					<ImageOff className={`h-${height / 2} w-${width / 2} text-gray-500`} />
				</div>
			)
		}

		return <img src={imageUrl} alt="Image" className={`h-${height} w-${width} object-contain border rounded-lg`} />
	},
	() => (
		<>
			<Field field={"picture.url"} />
		</>
	),
	'ImageFieldView',
)

export const ProfilePictureFieldView = Component(
	({ srcField, width, height }: { srcField?: string; width: number; height: number }) => {
		const src = srcField ?? 'picture.url'
		const imageUrl = useField<string>(src).value

		if (imageUrl === null || imageUrl === '') {
			return (
				<div className={`h-${height} w-${width} object-contain border rounded-lg bg-gray-100 flex items-center justify-around`}>
					<ImageOff className={`h-${height / 2} w-${width / 2} text-gray-500`} />
				</div>
			)
		}

		return <img src={imageUrl} alt="Image" className={`h-${height} w-${width} object-contain border rounded-lg`} />
	},
	() => (
		<>
			<Field field={"profilePicture.url"} />
		</>
	),
	'ImageFieldView',
)