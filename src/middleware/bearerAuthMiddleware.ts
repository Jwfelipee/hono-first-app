import { jwtService } from "@service"

export const bearerAuthMiddleware = async (c, next) => {
    const tokenRaw = c.req.header('Authorization')
    const token = tokenRaw?.replace('Bearer ', '')
    if (!token) {
        return c.text('Unauthorized', 401)
    }
    const jwtData = await jwtService.verify(token)
    if (!jwtData) {
        return c.text('Unauthorized', 401)
    }

    await next()
}