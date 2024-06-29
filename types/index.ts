import { Quote, User } from "@/drizzle/schema"

export type Quote = typeof Quote.$inferSelect
export type User = typeof User.$inferSelect

export type QuoteUser = Quote & { User: User }