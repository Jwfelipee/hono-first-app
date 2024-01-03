import { Hono } from 'hono'
import { authService } from '@service'

const authController = new Hono()

type LoginBody = {
    username: string;
    password: string;
};
authController.post('/', async (c) => {
    const body = await c.req.json<LoginBody>()
    const token = await authService.login(body.username, body.password)
    return c.json({
        token
    })
})

authController.get('/me', async (c) => {
    const tokenRaw = c.req.header('Authorization')
    const token = tokenRaw?.replace('Bearer ', '')
    const user = await authService.verify(token)
    return c.json({
        user
    })
})

export { authController }
