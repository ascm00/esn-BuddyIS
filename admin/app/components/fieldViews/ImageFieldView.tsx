import { Component, Field, useEntity, useField } from '@contember/interface'
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



export const EventPictureFieldView = Component(
	() => {
		const entity = useEntity()
		const pictureUrl = entity.getField<string>('picture.url').value ?? '/esn_star.png'
		
		return(
			<div className='flex-none rounded-lg overflow-hidden w-full md:w-100 aspect-square mx-auto'>
				<img src={pictureUrl} alt="Image" className={`h-full w-full object-cover border rounded-lg`} />
			</div>
		)
	},
	() => (
		<>
			<Field field={"picture.url"} />
		</>
	),
	'ImageFieldView',
)

const EventPictureField = Component(
	() => {
		const entity = useEntity()
		const pictureUrl = entity.getField<string>('picture.url').value ?? '/esn_star.png'

		return(
			<div className='flex-none rounded-lg overflow-hidden w-full md:w-100 aspect-square mx-auto'>
				<img src={pictureUrl} alt="Image" className={`h-full w-full object-cover border rounded-lg`} />
			</div>
		)
	}, () => (
		<>
			<Field field={'picture.url'} />
		</>
	)
)
