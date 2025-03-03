// import { Link, RoutingLinkTarget } from '@contember/react-routing'
// import { ReactNode } from 'react'
// import { uic } from '../utils'
// import { RoleCondition, useProjectUserRoles } from '@contember/interface'
// import { createContext } from '@contember/react-utils'
// import { SidebarMenu, SidebarMenuButton, sidebarMenuButtonVariants, SidebarMenuItem, SidebarMenuSub } from './sidebar'

// export const MenuItemUI = uic('a', {
// 	baseClass: 'flex justify-start py-2.5 px-2.5 w-full gap-2 rounded text-sm items-center transition-all duration-200',
// })

// export const MenuButtonUI = uic('a', {
// 	baseClass: 'flex justify-center py-2.5 px-2.5 w-full gap-2 rounded text-sm items-center transition-all duration-200 bg-blue-500 text-white',
// })

// export const MenuItemIconUI = uic('span', {
// 	baseClass: 'w-4 text-gray-400 inline-flex items-center justify-center',
// })

// export const MenuSubMenuUI = uic('div', {
// 	baseClass: 'ml-2',
// })

// export type MenuItem = {
// 	icon?: ReactNode
// 	label: ReactNode
// 	to?: RoutingLinkTarget
// 	/** @deprecated use children instead */
// 	subItems?: MenuItem[]
// 	lvl?: number
// 	role?: RoleCondition
// 	children?: ReactNode
// }

// interface MenuContextValue {
// 	level: number
// }

// const [MenuContext, useMenuContext] = createContext<MenuContextValue | null>('MenuContext', null)
// export const Menu = ({ children }: {
// 	children?: ReactNode
// }) => {
// 	return (
// 		<MenuContext.Provider value={{ level: 0 }}>
// 			<SidebarMenu>
// 				{children}
// 			</SidebarMenu>
// 		</MenuContext.Provider>
// 	)
// }

// export interface MenuListProps {
// 	items: MenuItem[]
// 	lvl?: number
// }

// /**
//  * @deprecated use Menu instead
//  */
// export const MenuList = ({ items, lvl = 0 }: MenuListProps) => {
// 	return (
// 		<div className={'flex flex-col'}>
// 			{items.map((item, index) => (
// 				<MenuItem key={index} {...item} lvl={lvl} />
// 			))}
// 		</div>
// 	)
// }

// export type MenuItemProps = {
// 	icon?: ReactNode
// 	label: ReactNode
// 	to?: RoutingLinkTarget
// 	children?: ReactNode
// 	role?: RoleCondition
// 	expandedByDefault?: boolean
// } & VariantProps<typeof sidebarMenuButtonVariants>

// export const MenuItem = ({ icon, label, to, children, role, expandedByDefault, ...menuButtonProps }: MenuItemProps) => {
// 	const isActive = useIsActiveMenuItem(to)
// 	const hasActiveChild = useHasActiveChild(children)
// 	const projectRoles = useProjectUserRoles()
// 	const { level } = useMenuContext()

// 	if (role && !(typeof role === 'string' ? projectRoles.has(role) : role(projectRoles))) {
// 		return null
// 	}

// 	const hasChildren = Boolean(children)

// 	if (!hasChildren && to) {
// 		return (
// 			<SidebarMenuItem>
// 				<Link to={to}>
// 					<SidebarMenuButton isActive={isActive} tooltip={label} {...menuButtonProps}>
// 						{icon}
// 						<span>{label}</span>
// 					</SidebarMenuButton>
// 				</Link>
// 			</SidebarMenuItem>
// 		)
// 	}

// 	return (
// 		<Collapsible defaultOpen={expandedByDefault || hasActiveChild} className="[&[data-state=open]>li>button>.menu-icon]:rotate-90">
// 			<SidebarMenuItem>
// 				<CollapsibleTrigger asChild>
// 					<SidebarMenuButton isActive={isActive} tooltip={label} {...menuButtonProps}>
// 						{icon}
// 						<span>{label}</span>
// 						{hasChildren && (
// 							<ChevronRight className="ml-auto transition-transform duration-200" />
// 						)}
// 					</SidebarMenuButton>
// 				</CollapsibleTrigger>
// 				{hasChildren && (
// 					<CollapsibleContent className="collapsible-animate">
// 						<SidebarMenuSub>
// 							<MenuContext.Provider value={{ level: level + 1 }}>
// 								{children}
// 							</MenuContext.Provider>
// 						</SidebarMenuSub>
// 					</CollapsibleContent>
// 				)}
// 			</SidebarMenuItem>
// 		</Collapsible>
// 	)
// }

// export const MenuButton = ({ icon, label, to, subItems, lvl, role, children }: MenuItem) => {
// 	const projectRoles = useProjectUserRoles()
// 	const menu = useMenuContext()
// 	lvl ??= menu?.level ?? 0
// 	if (role && !(typeof role === 'string' ? projectRoles.has(role) : role(projectRoles))) {
// 		return null
// 	}

// 	return (
// 		<div>
// 			{to ? (
// 				<Link to={to}>
// 					<MenuButtonUI className={'hover:bg-blue-600 cursor-pointer'}>
// 						{/* <MenuItemIconUI>{icon}</MenuItemIconUI> */}
// 						<span className={lvl === 0 ? 'font-medium' : ''}>{label}</span>
// 					</MenuButtonUI>
// 				</Link>
// 			) : (
// 				<MenuButtonUI>
// 					{/* <MenuItemIconUI>{icon}</MenuItemIconUI> */}
// 					<span className={lvl === 0 ? 'font-medium' : ''}>{label}</span>
// 				</MenuButtonUI>
// 			)}
// 			{subItems && (
// 				<MenuSubMenuUI>
// 					<MenuList items={subItems} lvl={lvl + 1}/>
// 				</MenuSubMenuUI>
// 			)}

// 			{children && (
// 				<MenuSubMenuUI>
// 					<MenuContext.Provider value={{ level: lvl + 1 }}>
// 						{children}
// 					</MenuContext.Provider>
// 				</MenuSubMenuUI>
// 			)}
// 		</div>
// 	)
// }

// export const MenuDivider = () => {
// 	return <div className={'border-t border-gray-300 my-2'} />
// }

import {
	Link,
	type RoleCondition,
	type RoutingLinkTarget,
	useCurrentRequest,
	useProjectUserRoles,
} from '@contember/interface'
import { createContext } from '@contember/react-utils'
import { VariantProps } from 'class-variance-authority'
import { ChevronRight } from 'lucide-react'
import { Children, isValidElement, ReactNode, useMemo } from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible'
import { SidebarMenu, SidebarMenuButton, sidebarMenuButtonVariants, SidebarMenuItem, SidebarMenuSub, useSidebar } from './sidebar'
import { uic } from '../utils/uic'

export type MenuItemProps = {
	icon?: ReactNode
	label: ReactNode
	to?: RoutingLinkTarget
	children?: ReactNode
	role?: RoleCondition
	expandedByDefault?: boolean
} & VariantProps<typeof sidebarMenuButtonVariants>

interface MenuContextValue {
	level: number
}

const [MenuContext, useMenuContext] = createContext<MenuContextValue>('MenuContext', { level: 0 })

const useIsActiveMenuItem = (to?: RoutingLinkTarget): boolean => {
	const pageName = useCurrentRequest()?.pageName

	if (!to || !pageName) {
		return false
	}

	return typeof to === 'string'
		? pageName === to
		: 'pageName' in to && pageName === to.pageName
}

const useHasActiveChild = (children: ReactNode) => {
	const currentRequest = useCurrentRequest()
	const pageName = currentRequest?.pageName

	return useMemo(() => {
		if (!pageName || !children) return false

		const isMatchingPage = (to: string | { pageName: string }): boolean => {
			return typeof to === 'string'
				? pageName === to
				: 'pageName' in to && pageName === to.pageName
		}

		const checkChild = (child: ReactNode): boolean => {
			if (!isValidElement(child)) return false

			const { to, children: grandChildren } = child.props

			if (to && isMatchingPage(to)) return true

			if (!grandChildren) return false

			return Children.toArray(grandChildren).some(checkChild)
		}

		return Children.toArray(children).some(checkChild)
	}, [children, pageName])
}

export const Menu = ({ children }: { children: ReactNode }) => {
	return (
		<MenuContext.Provider value={{ level: 0 }}>
			<SidebarMenu>
				{children}
			</SidebarMenu>
		</MenuContext.Provider>
	)
}

export const MenuItem = ({ icon, label, to, children, role, expandedByDefault, ...menuButtonProps }: MenuItemProps) => {
	const isActive = useIsActiveMenuItem(to)
	const hasActiveChild = useHasActiveChild(children)
	const projectRoles = useProjectUserRoles()
	const { level } = useMenuContext()

	if (role && !(typeof role === 'string' ? projectRoles.has(role) : role(projectRoles))) {
		return null
	}

	const hasChildren = Boolean(children)

	if (!hasChildren && to) {
		return (
			<SidebarMenuItem>
				<Link to={to}>
					<SidebarMenuButton isActive={isActive} tooltip={label} {...menuButtonProps}>
						{icon}
						<span>{label}</span>
					</SidebarMenuButton>
				</Link>
			</SidebarMenuItem>
		)
	}

	return (
		<Collapsible defaultOpen={expandedByDefault || hasActiveChild} className="[&[data-state=open]>li>button>.menu-icon]:rotate-90">
			<SidebarMenuItem>
				<CollapsibleTrigger asChild>
					<SidebarMenuButton isActive={isActive} tooltip={label} {...menuButtonProps}>
						{icon}
						<span>{label}</span>
						{hasChildren && (
							<ChevronRight className="ml-auto transition-transform duration-200" />
						)}
					</SidebarMenuButton>
				</CollapsibleTrigger>
				{hasChildren && (
					<CollapsibleContent className="collapsible-animate">
						<SidebarMenuSub>
							<MenuContext.Provider value={{ level: level + 1 }}>
								{children}
							</MenuContext.Provider>
						</SidebarMenuSub>
					</CollapsibleContent>
				)}
			</SidebarMenuItem>
		</Collapsible>
	)
}

export const MenuItemExternal = ({ icon, label, to, children, role, expandedByDefault, ...menuButtonProps }: MenuItemProps) => {
	const isActive = useIsActiveMenuItem(to)
	const hasActiveChild = useHasActiveChild(children)
	const projectRoles = useProjectUserRoles()
	const { level } = useMenuContext()

	to = to?.toString()

	if (role && !(typeof role === 'string' ? projectRoles.has(role) : role(projectRoles))) {
		return null
	}

	const hasChildren = Boolean(children)

	if (!hasChildren && to) {
		return (
			<SidebarMenuItem>
				<a target='_blank' href={to}>
					<SidebarMenuButton isActive={isActive} tooltip={label} {...menuButtonProps}>
						{icon}
						<span>{label}</span>
					</SidebarMenuButton>
				</a>
			</SidebarMenuItem>
		)
	}
}

export const MenuButtonUI = uic('a', {
	baseClass: 'flex justify-center py-2.5 px-2.5 w-full gap-2 rounded text-sm items-center transition-all duration-200 bg-blue-500 text-white',
})

export const MenuItemIconUI = uic('span', {
	baseClass: 'w-4 text-gray-400 inline-flex items-center justify-center',
})

export const MenuSubMenuUI = uic('div', {
	baseClass: 'ml-2',
})

export const MenuButton = ({ icon, label, to, role, children }: MenuItemProps) => {
	const projectRoles = useProjectUserRoles()
	const menu = useMenuContext()
	const { state } = useSidebar()

	// lvl ??= menu?.level ?? 0
	if (role && !(typeof role === 'string' ? projectRoles.has(role) : role(projectRoles))) {
		return null
	}
	if (state === 'collapsed') {
		return null
	}
	return (
		<div>
			{to ? (
				<Link to={to}>
					<MenuButtonUI className={'hover:bg-blue-600 cursor-pointer'}>
						{/* <MenuItemIconUI>{icon}</MenuItemIconUI> */}
						<span className={'font-medium'}>{label}</span>
					</MenuButtonUI>
				</Link>
			) : (
				<MenuButtonUI>
					{/* <MenuItemIconUI>{icon}</MenuItemIconUI> */}
					<span className={'font-medium'}>{label}</span>
				</MenuButtonUI>
			)}
			{/* {subItems && (
				<MenuSubMenuUI>
					<MenuList items={subItems} lvl={lvl + 1}/>
				</MenuSubMenuUI>
			)} */}

			{children && (
				<MenuSubMenuUI>
					<MenuContext.Provider value={{ level: 1 }}>
						{children}
					</MenuContext.Provider>
				</MenuSubMenuUI>
			)}
		</div>
	)
}

export const MenuDivider = () => {
	return <div className={'border-t border-gray-300 my-2'} />
}

