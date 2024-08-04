import { createElement, Fragment, ReactNode } from 'react'
import { isLeaf, LeafRenderer, RichTextElement } from './types'

export const renderLeaf: LeafRenderer = leaf => {
	let content = <>{leaf.text}</>

	if (leaf.bold) {
		content = <strong>{content}</strong>
	}
	if (leaf.italic) {
		content = <em>{content}</em>
	}
	if (leaf.underline) {
		content = <u>{content}</u>
	}
	if (leaf.strikethrough) {
		content = <s>{content}</s>
	}
	if (leaf.code) {
		content = <code>{content}</code>
	}

	return content
}
export const renderElement = (element: RichTextElement, renderLeaf: LeafRenderer): ReactNode => {
	if (isLeaf(element)) {
		return <>{renderLeaf(element)}</>
	}

	const children = element.children.map((child, index) => {
		if (isLeaf(child)) {
			return <Fragment key={index}>{renderLeaf(child)}</Fragment>
		}

		return <Fragment key={index}>{renderElement(child, renderLeaf)}</Fragment>
	})

	switch (element.type) {
		case 'paragraph':
		case 'p':
			return <p>{children}</p>
		case 'h1':
		case 'h2':
		case 'h3':
		case 'h4':
		case 'h5':
		case 'h6':
			return createElement(element.type, {}, children)
		case 'a':
			return <a href={element.url} target={'_blank'}>{children}</a>
		default:
			if (import.meta.env.DEV) {
				console.warn(`Rich-text renderer unknown element type: ${element.type}`)
			}

			return <div>{children}</div>
	}
}


