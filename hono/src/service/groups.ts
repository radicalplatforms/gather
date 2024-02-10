import {zValidator} from '@hono/zod-validator'
import {and, eq} from 'drizzle-orm'
import {createInsertSchema} from 'drizzle-zod'
import {Hono} from 'hono'
import {z} from 'zod'
import {groups, usersToGroups} from '../schema'
import type {Bindings, Variables} from '../utils/injectDB'
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

app.post('/', zValidator('json', insertGroupSchema.omit({id: true})), injectDB, async (c) => {
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

// POST endpoint to join a group
app.post('/join-group', zValidator('json', z.object({
    authorUsername: z.string(),
    groupId: z.number()
})), injectDB, async (c) => {
    const {authorUsername, groupId} = c.req.valid('json');

    // First, check if the user is already in the group
    const usersToGroupsResults = await c.get('db').query.usersToGroups.findMany({
        where:
            and(
                eq(usersToGroups.authorUsername, authorUsername),
                eq(usersToGroups.groupId, groupId)),
    });


    // If the user is already in the group, return an error
    if (usersToGroupsResults) {
        return c.json({message: 'User is already in the group'}, 400);
    }

    // If not, add the user to the group
    await c
        .get('db')
        .insert(usersToGroups)
        .values([
            {
                authorUsername: authorUsername,
                groupId: groupId,
                isOwner: false,
            },
        ])
        .run();

    // Return success message
    return c.json({message: 'Successfully joined the group'}, 201);
});

export default app
