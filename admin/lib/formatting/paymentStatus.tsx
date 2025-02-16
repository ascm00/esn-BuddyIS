export const formatPaymentStatusTag = (value: string | null) => {
	switch (value) {
		case 'unpaid':
			return (<div className="bg-red-100 mt-1 text-red-700 px-1 py-1 rounded text-sm font-semibold" style={{ display: 'inline-block' }}>Not paid</div>)
		case 'cancelled':
			return (<div className="bg-red-100 mt-1 text-red-700 px-1 py-1 rounded text-sm font-semibold" style={{ display: 'inline-block' }}>Cancelled</div>)
		case 'pending':
			return (<div className="bg-yellow-100 mt-1 text-yellow-700 px-1 py-1 rounded text-sm font-semibold" style={{ display: 'inline-block' }}>Pending</div>)
		case 'paid':
			return (<div className="bg-green-100 mt-1 text-green-700 px-1 py-1 rounded text-sm font-semibold" style={{ display: 'inline-block' }}>Paid</div>)
		default:
			return value
	}
}