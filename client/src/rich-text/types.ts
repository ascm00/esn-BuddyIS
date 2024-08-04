export interface Element {
	type: string
	children: Element[]
	[key: string]: any
}
export interface Leaf {
	text: string
	[key: string]: any
}

export type RichTextElement = Element | Leaf
export type HTMLLeafRenderer = (leaf: Leaf) => string

export const isElement = (element: RichTextElement): element is Element => 'type' in element
export const isLeaf = (element: RichTextElement): element is Leaf => 'text' in element