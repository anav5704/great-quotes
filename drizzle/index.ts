import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as relations from "@/drizzle/relations"
import * as models from "@/drizzle/schema"

const sql = neon(process.env.DATABASE_URL!)
export const db = drizzle(sql, { schema: { ...models, ...relations } })