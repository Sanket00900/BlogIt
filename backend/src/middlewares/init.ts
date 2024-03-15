import { verify } from 'hono/jwt'

export function initMiddleware(app : any) {
  
//@ts-ignore
app.use('api/v1/blog/*', async (c, next) => {
  //TODO : get the header, verify it and if its correct then will procced else will return 403 !

  const authHeader = c.req.header("Authorization") || "";
  const secret = c.env.JWT_SECRET
  
  if (!authHeader) {
    c.status(403)
    return(c.json({"message" : "unauthorized user !"}))
  }
  const token = authHeader.split(' ')[1]

  const user = await verify(token, secret)

  if (!user) {
    c.status(401)
     return c.json({ error: "unauthorized" }); 
  }
    //! pass id from middleware to route handler !
    c.set('userId', user.id);
    await next()
})
}