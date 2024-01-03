export class User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;

    static from(obj: Partial<User>): User {
        if (!obj.email || !obj.password) {
            throw new Error('Email and password are required')
        }
        
        const user = new User()
        user.id = obj.id
        user.email = obj.email
        user.password = obj.password
        user.firstName = obj.firstName
        user.lastName = obj.lastName
        return user
    }
}