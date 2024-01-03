import { Hono } from "hono";
import { userService } from '@service';
import { User } from "@entity";

const userController = new Hono();

userController.get('/', async (c) => {
    const users = await userService.findAll();
    return c.json({
        users
    });
});

userController.get('/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const user = await userService.findById(id);
    return c.json({
        user
    });
});

userController.post('/', async (c) => {
    const body = await c.req.json();
    const user = User.from(body)
    const userCreated = await userService.create(user);
    return c.json({
        user: userCreated
    });
});

userController.put('/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const body = await c.req.json();
    const user = await userService.update(id, body);
    return c.json({
        user
    });
});

userController.delete('/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const user = await userService.delete(id);
    return c.json({
        user
    });
});

export { userController }