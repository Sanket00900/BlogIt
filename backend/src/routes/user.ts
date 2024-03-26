import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signupInput, signinInput } from '@sanket00900/blogit'

//! whatever .env vars you want, put them into bindings so that Typescript should know  !
export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
}>();


//? ROUTE: POST - /api/v1/signup

userRouter.post('/signup', async (c) => {


  //*getting body in hono
  const body = await c.req.json()

  //? zod validation

  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411)
    return c.json({
      "message": "Invalid inputs !"
    })
  }


  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {

    //TODO : zod validation and password hasing !

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      }
    })

    const secret = c.env.JWT_SECRET

    const token = await sign({ id: user.id }, secret)
    c.status(200)
    return c.json({ token })
  } catch (error) {
    c.status(403);
    return c.json({ error: "error while signing up" });
  }
})

//? ROUTE: POST - /api/v1/signup

userRouter.post('/signin', async (c) => {

  const body = await c.req.json()
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs not correct"
    })
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password
      }
    })

    if (!existingUser) {
      c.status(403)
      return c.json({ "message": "User does not exists / Invalid username or password !" })
    }

    const secret = c.env.JWT_SECRET

    const token = await sign({ id: existingUser.id }, secret)
    c.status(200)
    return c.json({ token })

  } catch (error) {
    c.status(403)
    return c.json({ "message": "error while signing in !" })
  }
})

