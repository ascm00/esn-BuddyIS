import { Component } from '@contember/interface'
import {
	EditorElementTrigger,
	EditorGenericTrigger,
	EditorMarkTrigger,
	anchorElementType,
	boldMark,
	codeMark,
	createAlignHandler,
	headingElementType,
	highlightMark,
	italicMark,
	orderedListElementType,
	paragraphElementType,
	strikeThroughMark,
	underlineMark,
	unorderedListElementType,
} from '@contember/react-slate-editor'
import { BlockEditorField as BlockEditorFieldBase, BlockEditorFieldProps as BlockEditorFieldPropsBase, EditorInlineToolbar } from '@app/lib/editor'
import { Toggle } from '@app/lib/ui/toggle'
import { uic } from '@app/lib/utils'
import {
	AlignCenterIcon,
	AlignJustifyIcon,
	AlignLeftIcon,
	AlignRightIcon,
	BoldIcon,
	CodeIcon,
	Heading1Icon,
	Heading2Icon,
	Heading3Icon,
	HighlighterIcon,
	ItalicIcon,
	Link2Icon,
	ListIcon,
	ListOrderedIcon,
	PilcrowIcon,
	StrikethroughIcon,
	UnderlineIcon,
} from 'lucide-react'

export interface BlockEditorFieldProps {
	field: BlockEditorFieldPropsBase['field']
	referencesField: BlockEditorFieldPropsBase['referencesField']
	label?: string
}

const BlockButton = uic('button', {
	baseClass: 'bg-white p-2 inline-flex flex-col hover:bg-gray-100 border rounded-md w-32 items-center justify-center',
})

export const BlockEditorField = Component(({ field, referencesField, label }: BlockEditorFieldProps) => (
	<div className="mr-4 flex flex-col gap-2">
		{label && <div>{label}</div>}
		<BlockEditorFieldBase
			field={field}
			referencesField={referencesField}
			referenceDiscriminationField="type"
			plugins={
				[
					// Example how to register custom plugin
					// editor => {
					// 	editor.registerElement({
					// 		type: 'link',
					// 		isInline: true,
					// 		render: LinkElement,
					// 	})
					// },
				]
			}
		>
			{/* Example how to include toolbar */}
			{/*<EditorBlockToolbar>*/}
			{/* Example how to include references in toolbar */}
			{/* Quote reference example. See also line 213 */}
			{/*	<EditorReferenceTrigger referenceType="quote"><BlockButton><QuoteIcon /> Quote</BlockButton></EditorReferenceTrigger>*/}
			{/* Image reference example. See also line 218 */}
			{/*	<EditorReferenceTrigger referenceType="image"><BlockButton><ImageIcon /> Image</BlockButton></EditorReferenceTrigger>*/}

			{/* Table element */}
			{/*	<EditorElementTrigger elementType={tableElementType}>*/}
			{/*		<BlockButton><TableIcon /> Table</BlockButton>*/}
			{/*	</EditorElementTrigger>*/}

			{/* Scroll target element */}
			{/*	<EditorElementTrigger elementType={scrollTargetElementType}>*/}
			{/*		<BlockButton><LocateIcon /> Scroll target</BlockButton>*/}
			{/*	</EditorElementTrigger>*/}

			{/* Horizontal rule element */}
			{/*	<EditorElementTrigger elementType={horizontalRuleElementType}>*/}
			{/*		<BlockButton><MinusIcon /> Horizontal rule</BlockButton>*/}
			{/*	</EditorElementTrigger>*/}
			{/*</EditorBlockToolbar>*/}
			<EditorInlineToolbar>
				<div>
					<EditorMarkTrigger mark={boldMark}>
						<Toggle>
							<BoldIcon className="h-3 w-3" />
						</Toggle>
					</EditorMarkTrigger>
					<EditorMarkTrigger mark={italicMark}>
						<Toggle>
							<ItalicIcon className="h-3 w-3" />
						</Toggle>
					</EditorMarkTrigger>
					<EditorMarkTrigger mark={underlineMark}>
						<Toggle>
							<UnderlineIcon className="h-3 w-3" />
						</Toggle>
					</EditorMarkTrigger>
					<EditorMarkTrigger mark={strikeThroughMark}>
						<Toggle>
							<StrikethroughIcon className="h-3 w-3" />
						</Toggle>
					</EditorMarkTrigger>
					<EditorMarkTrigger mark={highlightMark}>
						<Toggle>
							<HighlighterIcon className="h-3 w-3" />
						</Toggle>
					</EditorMarkTrigger>
					<EditorMarkTrigger mark={codeMark}>
						<Toggle>
							<CodeIcon className="h-3 w-3" />
						</Toggle>
					</EditorMarkTrigger>
					<EditorElementTrigger elementType={anchorElementType}>
						<Toggle>
							<Link2Icon className="h-3 w-3" />
						</Toggle>
					</EditorElementTrigger>
					{/*<Popover>*/}
					{/*	<PopoverTrigger asChild>*/}
					{/*		<Toggle><LinkIcon className="h-3 w-3" /></Toggle>*/}
					{/*	</PopoverTrigger>*/}
					{/*	<PopoverContent>*/}
					{/*		<EditorInlineReferencePortal referenceType="link">*/}
					{/*			<LinkField field="link" />*/}
					{/*			<ConfirmReferenceButton />*/}
					{/*		</EditorInlineReferencePortal>*/}
					{/*	</PopoverContent>*/}
					{/*</Popover>*/}
				</div>
				<div>
					<EditorElementTrigger elementType={paragraphElementType} suchThat={{ isNumbered: false }}>
						<Toggle>
							<PilcrowIcon className="h-3 w-3" />
						</Toggle>
					</EditorElementTrigger>
					<EditorElementTrigger elementType={headingElementType} suchThat={{ level: 1, isNumbered: false }}>
						<Toggle>
							<Heading1Icon className="h-3 w-3" />
						</Toggle>
					</EditorElementTrigger>
					<EditorElementTrigger elementType={headingElementType} suchThat={{ level: 2, isNumbered: false }}>
						<Toggle>
							<Heading2Icon className="h-3 w-3" />
						</Toggle>
					</EditorElementTrigger>
					<EditorElementTrigger elementType={headingElementType} suchThat={{ level: 3, isNumbered: false }}>
						<Toggle>
							<Heading3Icon className="h-3 w-3" />
						</Toggle>
					</EditorElementTrigger>
					<EditorElementTrigger elementType={unorderedListElementType}>
						<Toggle>
							<ListIcon className="h-3 w-3" />
						</Toggle>
					</EditorElementTrigger>
					<EditorElementTrigger elementType={orderedListElementType}>
						<Toggle>
							<ListOrderedIcon className="h-3 w-3" />
						</Toggle>
					</EditorElementTrigger>

					<EditorGenericTrigger {...createAlignHandler('start')}>
						<Toggle className="ml-4">
							<AlignLeftIcon className="h-3 w-3" />
						</Toggle>
					</EditorGenericTrigger>
					<EditorGenericTrigger {...createAlignHandler('end')}>
						<Toggle>
							<AlignRightIcon className="h-3 w-3" />
						</Toggle>
					</EditorGenericTrigger>
					<EditorGenericTrigger {...createAlignHandler('center')}>
						<Toggle>
							<AlignCenterIcon className="h-3 w-3" />
						</Toggle>
					</EditorGenericTrigger>
					<EditorGenericTrigger {...createAlignHandler('justify')}>
						<Toggle>
							<AlignJustifyIcon className="h-3 w-3" />
						</Toggle>
					</EditorGenericTrigger>
				</div>
			</EditorInlineToolbar>

			{/* Example how to include references in editor */}
			{/* Uncomment also line 71 */}
			{/*<EditorBlock name="quote" label="Quote">*/}
			{/*	<EditorBlockContent />*/}
			{/*</EditorBlock>*/}

			{/* Uncomment also line 73 */}
			{/*<EditorBlock name="image" label="Image">*/}
			{/*	<ImageField baseField={'image'} urlField="url" />*/}
			{/*</EditorBlock>*/}
		</BlockEditorFieldBase>
	</div>
))