import { relations } from "drizzle-orm/relations";
import { User, Quote } from "./schema";

export const QuoteRelations = relations(Quote, ({one}) => ({
	User: one(User, {
		fields: [Quote.userId],
		references: [User.id]
	}),
}));

export const UserRelations = relations(User, ({many}) => ({
	Quotes: many(Quote),
}));