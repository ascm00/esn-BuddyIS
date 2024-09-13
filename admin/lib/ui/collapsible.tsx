import { cn } from '@app/lib/utils/cn'
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import { ChevronDownIcon } from 'lucide-react'
import React from 'react'

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = React.forwardRef<
	React.ElementRef<typeof CollapsiblePrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger>
 & { noArrow?: boolean }>(({ className, children, ...props }, ref) => (
	<CollapsiblePrimitive.Trigger
		ref={ref}
		className={cn(
			'flex items-center p-2.5 text-sm gap-2 w-full [&[data-state=open]>svg]:rotate-180',
			className,
		)}
		{...props}
	>
		<>
		{!props.noArrow && 
			<ChevronDownIcon
				size="1rem"
				className="text-gray-500 transition-transform duration-200"
			/>
		}
			{children}
		</>
	</CollapsiblePrimitive.Trigger>
))
CollapsibleTrigger.displayName = CollapsiblePrimitive.Trigger.displayName

const CollapsibleContent = React.forwardRef<
	React.ElementRef<typeof CollapsiblePrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>
>(({ className, ...props }, ref) => (
	<CollapsiblePrimitive.Content
		ref={ref}
		className={cn(
			'pl-6 overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down',
			className,
		)}
		{...props}
	/>
))
CollapsibleContent.displayName = CollapsiblePrimitive.Content.displayName

export { Collapsible, CollapsibleTrigger, CollapsibleContent }