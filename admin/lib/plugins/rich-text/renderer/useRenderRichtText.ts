import { JsonArray, JsonObject } from '@contember/interface'
import { ReactNode, useCallback } from 'react'
import { LeafRenderer, RichTextElement } from './types'

export interface Leaf {
	text: string
	[key: string]: any
}

export type HTMLLeafRenderer = (leaf: Leaf) => string

export type RenderRichTextProps = {
	renderLeaf: LeafRenderer
	renderElement: (element: RichTextElement, leafRenderer: LeafRenderer) => ReactNode
}

export const useRenderRichText = ({ renderElement, renderLeaf }: RenderRichTextProps) => {
	return useCallback(
		(value: string | null | JsonArray<never> | JsonObject<never> | number | boolean) => {
			const parsed = typeof value === 'string' ? JSON.parse(value) : value
			if (value && Array.isArray(parsed.children)) {
				return parsed.children.map((element: RichTextElement) => renderElement(element, renderLeaf))
			}

			return null
		},
		[renderElement, renderLeaf],
	)
}

export type RenderRichTextToHTMLProps = {
	renderLeafToHTML: HTMLLeafRenderer
	renderElementToHTML: (element: RichTextElement, leafRenderer: HTMLLeafRenderer) => string
}

export const useRenderRichTextToHTML = ({ renderElementToHTML, renderLeafToHTML }: RenderRichTextToHTMLProps) => {
	return useCallback(
		(value: string | null | JsonArray<never> | JsonObject<never> | number | boolean) => {
			const parsed = typeof value === 'string' ? JSON.parse(value) : value
			if (value && Array.isArray(parsed.children)) {
				return parsed.children.map((element: RichTextElement) => renderElementToHTML(element, renderLeafToHTML)).join('')
			}

			return null
		},
		[renderElementToHTML, renderLeafToHTML],
	)
}