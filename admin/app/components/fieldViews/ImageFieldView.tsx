import { Component, Field, useField } from '@contember/interface'
import { ImageOff } from 'lucide-react'

export const ImageFieldView = Component(
	({ width, height }: { width: number; height: number }) => {
		const imageUrl = useField<string>('picture.url').value

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
			<Field field="picture.url" />
		</>
	),
	'ImageFieldView',
)