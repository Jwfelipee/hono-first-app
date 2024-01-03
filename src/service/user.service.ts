import { User } from "@entity";

class UserService {
    users: User[] = []

    async findAll(): Promise<User[]> {
        return this.users
    }

    async findById(id: number): Promise<User | undefined> {
        return this.users.find((item) => item.id === id)
    }

    async create(user: User): Promise<User> {
        const biggestId = this.users.reduce((acc, item) => {
            return item.id > acc ? item.id : acc
        }, 0)
        
        this.users.push({
            ...user,
            id: biggestId + 1,
        })
        return user
    }

    async update(id: number, user: User): Promise<User | undefined> {
        const index = this.users.findIndex((item) => item.id === id)
        if (index === -1) {
            return undefined
        }
        const oldUser = this.users[index]
        const newUser = { ...oldUser, ...user }
        this.users[index] = newUser
        return newUser
    }

    async delete(id: number): Promise<User | undefined> {
        const index = this.users.findIndex((item) => item.id === id)
        if (index === -1) {
            return undefined
        }
        const user = this.users[index]
        this.users.splice(index, 1)
        return user
    }
}

export const userService = new UserService()