import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'

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

// zod validation for signup 



//signup route
app.post('/api/v1/user/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  try {
    const user = await prisma.user.create({
      data:{
        email: body.email,
        password: body.password,
        name: body.name
      }
    })
    const token = await sign({id : user.id},c.env.JWT_SECRET) 
    return c.json({jwt: token });
  } catch (error) {
    c.status(411);
    return c.text("User already exist")
  }
 
})



//signin route
app.post('/api/v1/user/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  const body = await c.req.json();
  const user = await prisma.user.findUnique({
    where:{
      email: body.email,
      password: body.password
    }
  })

  if(!user){
    c.status(403);
    return c.json({
      error: "user not found"
    })
  }

  const token = await sign({id: user.id},c.env.JWT_SECRET);
  return c.json({
    jwt: token
  })

})




app.post('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})
app.put('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})
app.get('/api/v1/blog/:id', (c) => {
  return c.text('Hello Hono!')
})
app.get('/api/v1/blog/bilk', (c) => {
  return c.text('Hello Hono!')
})


export default app
