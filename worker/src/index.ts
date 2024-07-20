import { Hono } from 'hono'
import { env } from 'hono/adapter'
import { cors } from 'hono/cors'
import { contemberClient } from './middleware/contember-client'

export type Env = {
	CONTEMBER_BASE_API_URL: string
	CONTEMBER_PROJECT_SLUG: string
	CONTEMBER_API_TOKEN: string
	CONTEMBER_ACTIONS_SECRET_KEY: string
}

export type AppContext = {
	Bindings: Env
}

const app = new Hono<AppContext>()

/**
 * Enable Contember client, cors and authorization for all routes starting with `/contember/`.
 */
app.use('/contember/*',
	cors(),
	async (c, next) => {
		const { CONTEMBER_BASE_API_URL, CONTEMBER_PROJECT_SLUG, CONTEMBER_API_TOKEN } = env(c)

		const client = contemberClient({
			baseUrl: CONTEMBER_BASE_API_URL,
			projectSlug: CONTEMBER_PROJECT_SLUG,
			token: CONTEMBER_API_TOKEN,
		})

		return client(c, next)
	},
	// Uncomment to enable bearer authorization for all routes starting with `/contember/`. Your Contember API has to have a `Settings` entity with a `workerAPiKey` field.
	// async (c, next) => {
	// 	const { client } = c.var
	//
	// 	const settings = await client.query(queryBuilder.get('Settings', { by: { unique: 'unique' } }, it => it.$('workerAPiKey')))
	//
	// 	const auth = bearerAuth({ token: settings?.workerAPiKey ? [settings.workerAPiKey] : [] })
	//
	// 	return auth(c, next)
	// },
)

/**
 * Cron jobs
 *
 * Uncomment to enable cron jobs with Hono.
 */

// export default {
// 	fetch: app.fetch,
// 	async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
// 		switch (event.cron) {
// 			case '0 5 * * *': /* every day at 5:00 */
// 				ctx.waitUntil()
// 				break
// 			case '0 4 1 * *': /* every 1st day in month at 4:00 */
// 				ctx.waitUntil()
// 				break
// 			case '5 4 1 * *': /* every 1st day in month at 4:05 */
// 				ctx.waitUntil()
// 				break
// 		}
// 	},
// }
