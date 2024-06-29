import { pgTable, varchar, timestamp, text, integer, index, foreignKey } from "drizzle-orm/pg-core"

export const User = pgTable("User", {
    id: text("id").primaryKey().notNull(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    createAt: timestamp("createAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
})

export const Quote = pgTable("Quote", {
    id: text("id").primaryKey().notNull(),
    content: text("content").notNull(),
    userId: text("userId").notNull().references(() => User.id, { onDelete: "restrict", onUpdate: "cascade" }),
    createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
},
    (table) => {
        return {
            userId_idx: index("Quote_userId_idx").on(table.userId),
        }
    })