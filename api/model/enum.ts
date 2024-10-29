import { c } from '@contember/schema-definition'

export const eventStatus = c.createEnum('open', 'cancelled', 'hidden')
export const applicationFrStatus = c.createEnum('enabled', 'disabled', 'cancelled')
export const applicationStatus = c.createEnum('toBePaired', 'paired', 'notPaired')
export const preferredSex = c.createEnum('man', 'woman', 'dontCare')
export const sex = c.createEnum('man', 'woman', 'other')
export const rating = c.createEnum('one', 'three', 'four', 'five', 'two')
export const applicationCzResult = c.createEnum('accepted', 'declined')
export const payment = c.createEnum('paid', 'pending', 'cancelled', 'unpaid')
export const contentReferenceTypeEnum = c.createEnum('example')
