import { pgTable, varchar, timestamp, text, integer, index, foreignKey } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const _prisma_migrations = pgTable("_prisma_migrations", {
	id: varchar("id", { length: 36 }).primaryKey().notNull(),
	checksum: varchar("checksum", { length: 64 }).notNull(),
	finished_at: timestamp("finished_at", { withTimezone: true, mode: 'string' }),
	migration_name: varchar("migration_name", { length: 255 }).notNull(),
	logs: text("logs"),
	rolled_back_at: timestamp("rolled_back_at", { withTimezone: true, mode: 'string' }),
	started_at: timestamp("started_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	applied_steps_count: integer("applied_steps_count").default(0).notNull(),
});

export const User = pgTable("User", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
	email: text("email").notNull(),
	createAt: timestamp("createAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
});

export const Quote = pgTable("Quote", {
	id: text("id").primaryKey().notNull(),
	content: text("content").notNull(),
	userId: text("userId").notNull().references(() => User.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		userId_idx: index("Quote_userId_idx").on(table.userId),
	}
});