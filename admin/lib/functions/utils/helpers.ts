import escapeHtml from 'escape-html'

export function addMonths(date: Date, months?: number) {
	if (typeof months !== 'number') return undefined

	const newDate = new Date(date)
	newDate.setMonth(newDate.getMonth() + months)
	return newDate
}

export function subtractMonths(date: Date, months?: number) {
	if (typeof months !== 'number') return undefined

	const newDate = new Date(date)
	newDate.setMonth(newDate.getMonth() - months)
	return newDate
}

type Node = {
	type: 'quote' | 'paragraph' | 'anchor'
	text?: string
	isBold?: boolean
	isItalic?: boolean
	href?: string
	children: Node[]
}

// export const serialize = (node: Node): string => {
// 	if ('text' in node) {
// 		let string = escapeHtml(node.text).replaceAll('\n', '<br>')
// 		if (node.isBold) {
// 			string = `<strong>${string}</strong>`
// 		}
// 		if (node.isItalic) {
// 			string = `<i>${string}</i>`
// 		}
// 		return string
// 	}

// 	const children = node.children.map(n => serialize(n)).join('')

// 	switch (node.type) {
// 		case 'quote':
// 			return `<blockquote><p>${children}</p></blockquote>`
// 		case 'paragraph':
// 			return `<p>${children}</p>`
// 		case 'anchor':
// 			return `<a href="${escapeHtml(node.href)}">${children}</a>`
// 		default:
// 			return children
// 	}
// }

export function isObject(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null
}
