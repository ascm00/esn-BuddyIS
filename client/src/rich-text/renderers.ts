import { HTMLLeafRenderer, isLeaf, RichTextElement } from './types'

export const renderLeafToHTML: HTMLLeafRenderer = leaf => {
	let content = leaf.text

	if (leaf.bold) {
		content = `<strong>${content}</strong>`
	}
	if (leaf.italic) {
		content = `<em>${content}</em>`
	}
	if (leaf.underline) {
		content = `<u>${content}</u>`
	}
	if (leaf.strikethrough) {
		content = `<s>${content}</s>`
	}
	if (leaf.code) {
		content = `<code>${content}</code>`
	}

	return content
}

export const renderElementToHTML = (element: RichTextElement, renderLeaf: HTMLLeafRenderer): string => {
	if (isLeaf(element)) {
		return renderLeafToHTML(element)
	}

	const children = element.children.map((child, index) => {
		if (isLeaf(child)) {
			return renderLeaf(child)
		}

		return renderElementToHTML(child, renderLeaf)
	}).join('')

	switch (element.type) {
		case 'paragraph':
		case 'p':
			return `<p>${children}</p>`
		case 'h1':
			return `<h1>${children}</h1>`
		case 'h2':
			return `<h2>${children}</h2>`
		case 'h3':
			return `<h3>${children}</h3>`
		case 'h4':
			return `<h4>${children}</h4>`
		case 'h5':
			return `<h5>${children}</h5>`
		case 'h6':
			return `<h6>${children}</h6>`
		case 'a':
			return `<a href="${element.url}" target="_blank">${children}</a>`
		default:
			return `<div>${children}</div>`
	}
}