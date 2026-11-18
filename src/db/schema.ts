import {
    index,
    numeric,
    pgEnum,
    pgTable,
    text,
    timestamp,
    uuid,
    varchar
} from 'drizzle-orm/pg-core'
import { table } from 'node:console'
export const userRole = pgEnum("user_role", ['admin', 'manager'])
export const clientStatus = pgEnum("client_status", ['lead', 'active', 'lost'])
export const dealStage = pgEnum('deal_stage', ['NEW', 'CONTACT', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST'])
export const users = pgTable('users', {
    id:uuid('id').primaryKey().defaultRandom(),
    email:varchar('email', {length:255}).notNull().unique(),
    passwordHash:text('password_hash').notNull(),
    role:userRole('role').notNull().default('manager'),
    firstName:varchar('first_name', {length:100}).notNull(),
    secondName: varchar('second_name', {length:100}).notNull(),
    createdAt:timestamp('created_at', {withTimezone:true}).notNull().defaultNow()
})
export const clients = pgTable('clients', {
    id:uuid('id').primaryKey().defaultRandom(),
    name:varchar('name', {length:255}).notNull(),
    company:varchar("company", {length:255}).notNull(),
    email:varchar('email', {length:255}).notNull(),
    phone:varchar('phone', {length:255}).notNull(),
    status:clientStatus('status').notNull().default('lead'),
    managerId:uuid('manager_id').notNull().references(()=>(users.id)),
    createdAt:timestamp('created_at', {withTimezone:true}).notNull().defaultNow(),
    updatedAt:timestamp('updated_at', {withTimezone:true}).notNull().defaultNow()
}, (table) => [index('clients_manager_idx').on(table.managerId)])
export const deals = pgTable('deals', {
    id:uuid('id').primaryKey().defaultRandom(),
    title:varchar('title', {length:255}).notNull(),
    budget:numeric('budget', {precision:14, scale:2, mode: 'number'}).notNull(),
    stage:dealStage('stage').notNull().default('NEW'),
    managerId:uuid('manager_id').notNull().references(()=>(users.id)),
    clientsId:uuid('clients_id').notNull().references(()=>(clients.id)),
    createdAt:timestamp('created_at', {withTimezone:true}).notNull().defaultNow(),
    updatedAt:timestamp('updated_at', {withTimezone:true}).notNull().defaultNow()
}, (table) => [
    index('deals_stage_idx').on(table.stage),
    index('deals_client_idx').on(table.clientsId),
    index('deals_manager_idx').on(table.managerId)
])

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Client = typeof clients.$inferSelect
export type NewClient = typeof clients.$inferInsert
export type Deal = typeof deals.$inferSelect
export type NewDeal = typeof deals.$inferInsert