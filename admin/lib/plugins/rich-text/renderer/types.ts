import { ReactNode } from 'react'

export type Element = { type: string; children: Element[]; [key: string]: any }
export type Leaf = { text: string; [key: string]: any }
export type LeafRenderer = (leaf: Leaf) => ReactNode
export type RichTextElement = Element | Leaf

export const isElement = (element: RichTextElement): element is Element => 'type' in element
export const isLeaf = (element: RichTextElement): element is Leaf => 'text' in element