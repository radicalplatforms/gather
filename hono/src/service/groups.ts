import { zValidator } from '@hono/zod-validator'
import { createInsertSchema } from 'drizzle-zod'
import { Hono } from 'hono'
import { z } from 'zod'
import { groups, usersToGroups } from '../schema'
import type { Bindings, Variables } from '../utils/injectDB'
import injectDB from '../utils/injectDB'

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>()

const insertGroupSchema = createInsertSchema(groups, {
  name: z.string().max(25),
})

app.get('/', injectDB, async (c) => {
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

app.post('/', zValidator('json', insertGroupSchema.omit({ id: true })), injectDB, async (c) => {
  const body = c.req.valid('json')
  const authorUsername = 'rak3rman'

  // Create a new group
  const createdGroup = await c.get('db').insert(groups).values(body).returning()

  // Add user who created the group as the host of the group
  await c
    .get('db')
    .insert(usersToGroups)
    .values([
      {
        authorUsername: authorUsername,
        groupId: createdGroup[0].id,
        isOwner: true,
      },
    ])
    .run()

  return c.text('Success')
})

export default app
