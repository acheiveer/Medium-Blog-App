import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";
import { JWTPayload } from "hono/utils/jwt/types";
import { createBlogInput,updateBlogInput } from "@prabhakr4u/medium-common";

export const blogRoutes = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables:{
        userId: string
    }
}>()

  
// use pagination here
blogRoutes.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

  const blogs = await prisma.post.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author:{
        select:{
          name: true
        }
      }
    }
  });
  return c.json({
      blogs
  }) 
})



blogRoutes.get('/:id', async (c) => {
  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const id =  c.req.param("id");
    try {
      const blog = await prisma.post.findFirst({
          where:{
            id: id
          },
          select: {
            id: true,
            content: true,
            title: true,
            author:{
              select:{
                name: true
              }
            }
          }
      })
      return c.json({ blog });

    } catch (error) {
      c.status(411);
      return c.json({
          message: "error while fethching the blog post"
      })
    }
})



blogRoutes.use("/*", async (c,next)=>{
    const authHeader = c.req.header("Authorization");
    if(!authHeader){
        c.status(403)
        return c.json({
            error: "Auth Header is missing or unAuthorized"
        })
    }
    // user is explicitly typed as JWTPayload | null, ensuring TypeScript can handle it correctly.
    // The user && typeof user.id === 'string' check guarantees that user has an id property of type string before setting it to userId.
    const user: JWTPayload | null = await verify(authHeader, c.env.JWT_SECRET);
    if(user && typeof user.id === 'string'){
        c.set("userId",user.id);
        await next();
    }
    else{
        c.status(403);
        return c.json({
          error: "Unauthorized"
        })
    }
    
})


blogRoutes.post('/like/:id',async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const PostId = c.req.param("id");
  const userId = c.get("userId");

  try {
    // check if the user already liked the post 
    const existingLike = await prisma.like.findFirst({
      where:{
        postId: PostId,
        userId: userId
      }
    })

    if(existingLike){
      return c.json({error : "You already liked this post"})
    }

    // Add a new like 
    const like = await prisma.like.create({
      data:{
        postId:PostId,
        userId:userId
      }
    })

    return c.json({id: like.id,
      message: "Post liked successfully"
    })
  } catch (error) {
    return c.json({ error: "Unable to like the post" }, 500);
  }

})

blogRoutes.post('/comment/:id', async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const postId = c.req.param("id");
  const userId = c.get("userId");
  const body = await c.req.json();

  if(!body.content){
    return c.json({error: "comment content is required"},400);
  }

  try {
    const comment = await prisma.comment.create({
      data:{
        content: body.content,
        postId: postId,
        authorId: userId
      }
    })

    return c.json({id: comment.id,
      message: "comment added successfully"
    })
  } catch (error) {
    return c.json({ error: "Unable to add comment" }, 500);
  }
})


blogRoutes.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      const body = await c.req.json();
      const {success} = createBlogInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message: "Inputs not correct"
      })
    }
      const authorId = c.get("userId");
      const blog = await prisma.post.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: authorId
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
      const {success} = updateBlogInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message: "Inputs not correct"
      })
    }
      const blog = await prisma.post.update({
        where:{
            id: body.id
        },
        data:{
            title: body.title,
            content: body.content,
        }
      })
      
    return c.json({
        id: blog.id
    })
  })


  
// // use pagination here
// blogRoutes.get('/bulk', async (c) => {
//     const prisma = new PrismaClient({
//         datasourceUrl: c.env.DATABASE_URL,
//       }).$extends(withAccelerate())

//     const blogs = await prisma.post.findMany({
//       select: {
//         content: true,
//         title: true,
//         id: true,
//         author:{
//           select:{
//             name: true
//           }
//         }
//       }
//     });
//     return c.json({
//         blogs
//     }) 
//   })

  

// blogRoutes.get('/:id', async (c) => {
//     const prisma = new PrismaClient({
//         datasourceUrl: c.env.DATABASE_URL,
//       }).$extends(withAccelerate())

//       const id =  c.req.param("id");
//       try {
//         const blog = await prisma.post.findFirst({
//             where:{
//               id: id
//             },
//             select: {
//               id: true,
//               content: true,
//               title: true,
//               author:{
//                 select:{
//                   name: true
//                 }
//               }
//             }
//         })
//         return c.json({ blog });

//       } catch (error) {
//         c.status(411);
//         return c.json({
//             message: "error while fethching the blog post"
//         })
//       }
//   })

