import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { authController, userController } from '@controller'
import { bearerAuthMiddleware } from './middleware'

export const app = new Hono()
app.get('/', (c) => c.text('Hello Node.js!'))

app.route('/auth', authController)

app.use('/user/*', bearerAuthMiddleware)
app.route('/user', userController)

serve(app).listen(3000, () => console.log('Server running at http://localhost:3000/'))