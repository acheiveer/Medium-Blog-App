import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export const blogRoutes = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>()




blogRoutes.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      const body = await c.req.json();

      const blog = await prisma.post.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: " "
        }
      })
      
    return c.json({
        id: blog.id
    })
  })


blogRoutes.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      const body = await c.req.json();

      const blog = await prisma.post.update({
        where:{
            id: body.id
        },
        data:{
            title: body.title,
            content: body.content,
            authorId: " "
        }
      })
      
    return c.json({
        id: blog.id
    })
  })


blogRoutes.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      const body = await c.req.json();
      try {
        const blog = await prisma.post.findFirst({
            where:{
              id: body.id
            },
        })
        return c.json({ blog });

      } catch (error) {
        c.status(411);
        return c.json({
            message: "error while fethching the blog post"
        })
      }
  })


// use pagination here
blogRoutes.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

    const blogs = await prisma.post.findMany();
    return c.json({
        blogs
    }) 
  })