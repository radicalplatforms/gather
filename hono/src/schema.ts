import { relations, sql } from 'drizzle-orm'
import { integer, real, sqliteTable, text, primaryKey } from 'drizzle-orm/sqlite-core'

/**
 * Events
 */
export const events = sqliteTable('events', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  desc: text('desc'),
  price: real('price'),
  location: text('location').notNull(),
  image: text('image'),
  startDate: text('start_date'),
  endDate: text('end_date'),
  isCustom: integer('is_custom', { mode: 'boolean' }).default(true),
  created: text('created').default(sql`CURRENT_TIMESTAMP`),
})

export const eventsRelations = relations(events, ({ many }) => ({
  usersToGroupEvents: many(usersToGroupEvents),
}))

/**
 * Groups
 */
export const groups = sqliteTable('groups', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
})

export const groupsRelations = relations(groups, ({ many }) => ({
  users: many(usersToGroups),
  usersToEvents: many(usersToGroupEvents),
}))

/**
 * Users
 */
export const users = sqliteTable('users', {
  authorUsername: text('authorUsername').primaryKey(),
})

export const usersRelations = relations(users, ({ many }) => ({
  usersToGroups: many(usersToGroups),
  usersToGroupEvents: many(usersToGroupEvents),
}))

/**
 * Users to Groups
 */
export const usersToGroups = sqliteTable(
  'users_to_groups',
  {
    authorUsername: text('authorUsername')
      .notNull()
      .references(() => users.authorUsername),
    groupId: integer('group_id')
      .notNull()
      .references(() => groups.id),
    isOwner: integer('is_owner', { mode: 'boolean' }).default(false),
  },
  (table) => {
    return {
      pk: primaryKey(table.authorUsername, table.groupId),
    }
  }
)

export const usersToGroupsRelations = relations(usersToGroups, ({ one }) => ({
  user: one(users, {
    fields: [usersToGroups.authorUsername],
    references: [users.authorUsername],
  }),
  group: one(groups, {
    fields: [usersToGroups.groupId],
    references: [groups.id],
  }),
}))

/**
 * An enumeration for user voting.
 *
 * @enum {number}
 * @property {number} against - user it not willing to attend this event.
 * @property {number} indifferent - user doesn't care too much about this event.
 * @property {number} willing - user is willing to attend this event.
 */

export enum votingEnum {
  'against',
  'indifferent',
  'willing',
}

/**
 * Users to Group Events
 */
export const usersToGroupEvents = sqliteTable(
  'users_to_group_events',
  {
    authorUsername: text('authorUsername')
      .notNull()
      .references(() => users.authorUsername),
    eventId: integer('event_id')
      .notNull()
      .references(() => events.id),
    groupId: integer('group_id')
      .notNull()
      .references(() => groups.id),
    vote: integer('vote').default(1).notNull(),
    startDate: text('start_date'),
  },
  (table) => {
    return {
      pk: primaryKey(table.authorUsername, table.eventId, table.groupId),
    }
  }
)

export const usersToGroupEventsRelations = relations(usersToGroupEvents, ({ one }) => ({
  user: one(users, {
    fields: [usersToGroupEvents.authorUsername],
    references: [users.authorUsername],
  }),
  event: one(events, {
    fields: [usersToGroupEvents.eventId],
    references: [events.id],
  }),
  group: one(groups, {
    fields: [usersToGroupEvents.groupId],
    references: [groups.id],
  }),
}))
