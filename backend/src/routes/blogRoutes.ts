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

blogRoutes.get('/comment/:id', async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

   const PostId = c.req.param("id");
   try {
    const comments =  await prisma.comment.findMany({
      where:{postId : PostId},
      include: {
        author: {
          select:{
            id:true,
            email:true,
            name:true
          }
        }
      },
      orderBy:{
        createdAt: "desc"
      }
     });
     return c.json({comments});

   } catch (error) {
    console.error(error); 
    return c.json({ error: "Unable to fetch comments" }, 500);
   }
})

blogRoutes.get('/like/:id',async (c) =>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const PostId = c.req.param("id");
  
  try {
    const likeCount  = await prisma.like.count({
      where:{
        postId: PostId
      }
    })
    return c.json({
      postId: PostId,
      likes: likeCount
    })
  } catch (error) {
    console.error("Error retrieving likes:", error);
    return c.json({ error: "Unable to retrieve likes for the post" }, 500);
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

blogRoutes.post("/comment/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const postId = c.req.param("id");
  const userId = c.get("userId");
  const body = await c.req.json();

  if (!userId) {
    return c.json({ error: "User not authenticated" }, 401);
  }

  if (!body.content) {
    return c.json({ error: "comment content is required" }, 400);
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        content: body.content,
        postId: postId,
        authorId: userId,
      },
    });

    return c.json({ id: comment.id, message: "comment added successfully" });
  } catch (error) {
    return c.json({ error: "Unable to add comment" }, 500);
  }
});


blogRoutes.post('/vote/:id', async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const commentId = c.req.param("id");
  const userId = c.get("userId");

   // Define the type for the request body
   interface VoteRequestBody {
    type: 'UPVOTE' | 'DOWNVOTE';
  }

  // Parse the request body and enforce type
  const body = await c.req.json() as VoteRequestBody;

  // Validate the vote type
  if(!['UPVOTE','DOWNVOTE'].includes(body.type)){
    return c.json({ error: "Invalid vote type. Use 'UPVOTE' or 'DOWNVOTE'" }, 400);
  }

  try {
    // check if the user already voted on this comment 
    const existingVote = await prisma.vote.findFirst({
      where:{
        commentId: commentId,
        userId: userId
      }
    })

    if(existingVote){
      return c.json({error: "You have alreday voted on this comment"}, 400)
    }

    // Add a new vote 
    const vote = await prisma.vote.create({
      data:{
        commentId: commentId,
        userId,
        type: body.type
      }
    })

    return c.json({ id: vote.id, type: vote.type, message: "Vote added successfully" });
  } catch (error) {
    return c.json({ error: "Unable to vote on the comment" }, 500);
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

       // Create the blog post
      const blog = await prisma.post.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: authorId
        }
      })

      // Add the author as a collaborator with the 'OWNER' role
     await prisma.blogCollaborator.create({
      data: {
        postId: blog.id,
        userId: authorId,
        role: 'OWNER',
      },
     });
      
    return c.json({
        id: blog.id,
        message: "Blog created and you are the owner"
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


blogRoutes.post('/:id/collaborators', async (c) =>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const blogId = c.req.param('id');
  const body = await c.req.json();

  //Ensure the blog exists 
  const blog = await prisma.post.findUnique({
    where:{
      id: blogId
    }
  })
  if(!blogId){
    return c.json({error: "Blog not found"}, 404);
  }

  //Ensure the requester is the owner
  const owner = await prisma.blogCollaborator.findFirst({
    where:{
      postId: blogId,
      userId: c.get('userId'),
      role: 'OWNER'
    }
  });
  if(!owner){
    return c.json({error: "Only the owner can add collaborators"}, 403);
  }

  //Add the collaborator
  const collaborator = await prisma.blogCollaborator.create({
    data:{
      postId: blogId,
      userId: body.userId,
      role: body.role
    }
  })

  return c.json({ message: 'Collaborator added', collaborator });

})  


