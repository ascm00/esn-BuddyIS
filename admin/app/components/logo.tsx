import { useSidebar } from "@app/lib/ui/sidebar"
import { Link } from "@contember/interface"

export const Logo = () => {
	const { state } = useSidebar()
	if (state === 'collapsed') {
		return (
		<Link to="eventFeed">
			<div className="flex-col">
			<img src="/esn_star.png" style={{ maxWidth: '30px', height: 'auto', marginTop: '7px' }}/>
			</div>
		</Link>
		)
	} else {
		return (
			<Link to="eventFeed">
				<div className="flex-col">
				<img src="/esn-logo.png" style={{ maxWidth: '200px', height: 'auto', paddingLeft: '10px' }}/>
				</div>
			</Link>
		)
	}
}
