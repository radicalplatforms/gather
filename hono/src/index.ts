import { Hono } from 'hono'

import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { version } from '../package.json'
import groups from './service/groups'

const app = new Hono()

app.onError((err, c) => {
  console.error(`${err}`)
  return c.text('Internal Service Error', 500)
})

app.use('*', logger())
app.use('*', prettyJSON())

app.get('/', async (c) => {
  return c.text(`Gather API v${version}`)
})

const routes = app.route('/api/groups', groups)

export default app
export type AppType = typeof routes
