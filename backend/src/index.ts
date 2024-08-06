import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import zod from "zod"
import { userRoutes } from './routes/userRoutes'
import { blogRoutes } from './routes/blogRoutes'

const app = new Hono<{
  Bindings:{
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()

//middlewares for authentications
app.use('/message/*', async (c, next) => {
  const jwt = c.req.header("Authorization");
  if(!jwt){
    c.status(401);
    return c.json({error: "Unauthorized"})
  }
  const token = jwt.split(' ')[1];
  const payload = await verify(token,c.env.JWT_SECRET);

  if(!payload){
    c.status(403);
    return c.json({
      error: "Unauthorized"
    })
  }

  await next();
})

// // zod validation for signup 
// const signupSchema = zod.object({
//   email: zod.string().email({message: "Invalid email address"}),
//   password: zod.string(),
//   name: zod.string()
// })

app.route("/api/v1/user",userRoutes);
app.route("/api/v1/blog",blogRoutes);








export default app
