import { zValidator } from '@hono/zod-validator'
import { eq } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { Hono } from 'hono'
import { z } from 'zod'
import { events, usersToGroupEvents } from '../schema'
import type { Bindings, Variables } from '../utils/injectDB'
import injectDB from '../utils/injectDB'

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>()

app.get('/', injectDB, async (c) => {
  const groupId: number | undefined = Number(c.req.query('groupId')) || undefined

  return c.json(
    await c.get('db').query.events.findMany({
      with: {
        usersToGroupEvents: {
          columns: {
            eventId: false,
          },
          where: groupId !== undefined ? eq(usersToGroupEvents.groupId, groupId) : undefined,
        },
      },
    })
  )
})

app.post(
  '/',
  zValidator('json', createInsertSchema(events).omit({ id: true })),
  injectDB,
  async (c) => {
    const body = c.req.valid('json')
    await c.get('db').insert(events).values(body).returning()
    return c.text('Success')
  }
)

app.post(
  '/vote',
  zValidator('json', createInsertSchema(usersToGroupEvents)),
  injectDB,
  async (c) => {
    const body = await c.req.json()
    await c.get('db').insert(usersToGroupEvents).values(body).returning()
    return c.text('Success')
  }
)

export default app
