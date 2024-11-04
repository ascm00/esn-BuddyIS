import { Link } from "@contember/interface"

export const Logo = () => {
	return (
		<Link to="eventFeed">
			<img src="/esn-logo.png" style={{ maxWidth: '200px', height: 'auto', paddingLeft: '10px' }}/>
		</Link>
	)
}
