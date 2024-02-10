import { and, asc, desc, eq, like, or, sql } from 'drizzle-orm'
import { Hono } from 'hono'
import {} from '../schema'
import type { Bindings, Variables } from '../utils/injectDB'
import injectDB from '../utils/injectDB'

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>()

app.get('/', injectDB, async (c) => {
  const authorUsername = 'rak3rman'

  return c.json(
    await c.get('db').query.groups.findMany({
      with: {
        users: {
          columns: {
            groupId: false,
          },
        },
        usersToEvents: {
          columns: {
            groupId: false,
          },
          with: {
            event: {},
          },
        },
      },
    })
  )
})

export default app
