// import { memo, PropsWithChildren } from 'react'
// import { IdentityLoader } from '@app/lib/binding'
// import { LayoutComponent, Slots } from '@app/lib/layout'
// import { Navigation } from './navigation'
// import { Link } from '@contember/interface'
// import { Logo } from './logo'

// export const Layout = memo(({ children }: PropsWithChildren) => {
// 	return (
// 		<IdentityLoader>
// 			<LayoutComponent>

// 				<Slots.Logo>
// 					<Logo />
// 				</Slots.Logo>

// 				<Slots.Navigation>
// 					<Navigation />
// 				</Slots.Navigation>

// 				<Slots.Footer>
// 					<div className='flex flex-row'>
// 						<div className='mr-2 text-sm'>
// 							<p><a href="https://app.esnvseprague.cz/?page=conditions" target='_blank'>Conditions</a> | </p>
// 						</div>
// 						<div>
// 							<img src="/footer.png" alt="card logos" style={{ width: '200px', height: '20px' }} />
// 						</div>
// 					</div>
// 				</Slots.Footer>

// 				{children}
// 			</LayoutComponent>
// 		</IdentityLoader>
// 	)
// })
// Layout.displayName = 'Layout'

import { Logo } from './logo'
import { Navigation } from './navigation'
import { Component, Field, Link } from '@contember/interface'
import { Binding, IdentityLoader } from '@app/lib/binding'
import { DimensionsSwitcher } from '@app/lib/dimensions'
import { LayoutComponent, Slots } from '@app/lib/layout'
import { PropsWithChildren } from 'react'

export const Layout = Component(({ children }: PropsWithChildren) => <IdentityLoader>
	<LayoutComponent>
		<Slots.Logo>
			<Link to="index">
				<Logo />
			</Link>
		</Slots.Logo>
		<Slots.Navigation>
			<Navigation />
			{/* <Binding>
				<DimensionsSwitcher options="Locale" slugField="code" dimension="locale" isMulti={true}>
					<Field field="label" />
				</DimensionsSwitcher>
			</Binding> */}
		</Slots.Navigation>
		<Slots.Footer>
			<div className='flex flex-row'>
				<div className='mr-2 text-sm'>
					<p><a href="https://app.esnvseprague.cz/?page=conditions" target='_blank'>Conditions</a> | </p>
				</div>
				<div>
					<img src="/footer.png" alt="card logos" style={{ width: '200px', height: '20px' }} />
				</div>
			</div>
		</Slots.Footer>
		{children}
	</LayoutComponent>
</IdentityLoader>)

