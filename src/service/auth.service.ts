import { IJwtService, jwtService } from "./jwt.service"

class AuthService {
    account = [
        {
            id: 1,
            username: 'admin',
            password: 'admin',
        },
        {
            id: 2,
            username: 'user',
            password: 'user',
        },
    ]
    constructor (private readonly jwtService: IJwtService) {
    }

    async login(username: string, password: string): Promise<string> {
        const user = this.account.find((item) => {
            return item.username === username && item.password === password
        })

        if (!user) {
            throw new Error('User not found')
        }
        console.log('here', this.jwtService)
        return await this.jwtService.sign({
            id: user.id,
            username: user.username,
        })
    }

    async verify(token: string): Promise<object> {
        console.log('here')
        const jwtData = await this.jwtService.verify<{ id: number }>(token)
        const user = this.account.find((item) => {
            return item.id === jwtData.id
        })
        return user
    }
}

export const authService = new AuthService(jwtService)