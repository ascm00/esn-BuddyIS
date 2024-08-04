import { Component, SugarableRelativeSingleField, useField } from '@contember/interface'
import { Field } from '@contember/react-binding'
import { RenderRichTextProps, useRenderRichText } from './useRenderRichtText'

export type RichTextFieldSourceProps = {
	sourceField: string | SugarableRelativeSingleField
} & RenderRichTextProps

export const RichTextRendererField = Component<RichTextFieldSourceProps>(
	({ sourceField, renderLeaf, renderElement }) => {
		const source = useField(sourceField)
		const renderer = useRenderRichText({ renderLeaf, renderElement })

		return <>{renderer(source.value)}</>
	},
	({ sourceField }) => {
		return <Field field={sourceField} />
	},
)