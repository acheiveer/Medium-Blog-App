import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import zod from "zod"
import { userRoutes } from './routes/userRoutes'
import { blogRoutes } from './routes/blogRoutes'
import { cors } from 'hono/cors'


const app = new Hono<{
  Bindings:{
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()
app.use('/*', cors())
app.route("/api/v1/user",userRoutes);
app.route("/api/v1/blog",blogRoutes);








export default app
