export const formatPaymentStatusTag = (value: string | null) => {
	switch (value) {
		case 'unpaid':
			return (<div className="bg-red-100 mt-1 text-red-700 px-3 py-1 rounded text-sm font-semibold">Not paid</div>)
		case 'cancelled':
			return (<div className="bg-red-100 mt-1 text-red-700 px-3 py-1 rounded text-sm font-semibold">Cancelled</div>)
		case 'pending':
			return (<div className="bg-yellow-100 mt-1 text-yellow-700 px-3 py-1 rounded text-sm font-semibold">Pending</div>)
		case 'paid':
			return (<div className="bg-green-100 mt-1 text-green-700 px-3 py-1 rounded text-sm font-semibold">Paid</div>)
		default:
			return value
	}
}