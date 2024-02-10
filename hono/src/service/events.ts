import { zValidator } from '@hono/zod-validator'
import { createInsertSchema } from 'drizzle-zod'
import { Hono } from 'hono'
import { z } from 'zod'
import { events, usersToGroupEvents } from '../schema'
import type { Bindings, Variables } from '../utils/injectDB'
import injectDB from '../utils/injectDB'

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>()

const insertEventSchema = createInsertSchema(events)

app.get('/', injectDB, async (c) => {})

app.post('/', zValidator('json', insertEventSchema), injectDB, async (c) => {
    const body = c.req.valid('json')

    // Create a new event
    await c.get('db').insert(events).values(body).returning()
    return c.text('Success')
})

// To update vote / preference on event in group
// app.post('/', injectDB, async (c) => {
//   const body = await c.req.json()
//   return c.json(await c.get('db').insert(usersToGroupEvents).values(body).returning())
// })

export default app
