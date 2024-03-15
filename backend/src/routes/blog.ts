import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
// import { initMiddleware } from '../middlewares/init';
import { verify } from 'hono/jwt';
import { createBlogInput, updateBlogInput } from '@sanket00900/blogit';

//! whenever you want to access env vars, specify the type in Hono Bindings like below ! 
export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string
    }
}>();

// initMiddleware(blogRouter)

blogRouter.use(async (c, next) => {
    const jwt = c.req.header('Authorization');
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
    const token = jwt.split(' ')[1];
    
    try {
    const payload = await verify(token, c.env.JWT_SECRET);
	if (!payload) {
		c.status(403);
		return c.json({ error: "unauthorized user" });
	}
	c.set('userId', payload.id);
	await next()    
    } catch (error) {
        c.status(403);
		return c.json({ error: "unauthorized user" });
    }

});


//TODO : add pagination 

blogRouter.get("/bulk",async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    try {
        const posts = await prisma.post.findMany({})
        // console.log(posts)
        return c.json(posts)
    } catch (error) {
        return c.json({
            "message" : "error while fetching blog posts !"
        })
    }
})

blogRouter.post('/',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    //! getting id from middleware !
    const userId = c.get('userId');

    const body = await c.req.json();

    const { success } = createBlogInput.safeParse(body);

    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }
    
    const post = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
            author: { connect: { id: userId } }
		}
	});

    return c.json({
        id : post.id
    })
})


blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const userId = c.get('userId');

    const body = await c.req.json();
    
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }


try {
    await prisma.post.update({
        where: {
            id: body.id,
            authorId: userId
        },
		data: {
			title: body.title,
			content: body.content,
		}
	});
    return c.text('updated post');
} catch (error) {
    c.status(411);
    return c.json({
        "message" : "error while fetching blog post !"
    })
}
})


blogRouter.get('/:id',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const id = c.req.param('id');
    
try {
    const post = await prisma.post.findFirst({
        where: {
            id
        }
	});

    return c.json({
        post
    }) 
} catch (error) {
    c.status(411);
    return c.json({
        "message" : "error while fetching blog post !"
    })
}

})

