import { relations } from "drizzle-orm/relations";
import { User, Quote, Like } from "./schema";

export const QuoteRelations = relations(Quote, ({one, many}) => ({
	User: one(User, {
		fields: [Quote.userId],
		references: [User.id]
	}),
	Likes: many(Like),
}));

export const UserRelations = relations(User, ({many}) => ({
	Quotes: many(Quote),
	Likes: many(Like),
}));

export const LikeRelations = relations(Like, ({one}) => ({
	User: one(User, {
		fields: [Like.userId],
		references: [User.id]
	}),
	Quote: one(Quote, {
		fields: [Like.quoteId],
		references: [Quote.id]
	}),
}));