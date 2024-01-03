import { sign, verify } from 'hono/jwt';

class JwtService implements IJwtService {
    private readonly jwtSecret: string = "secret";
    private readonly jwtExpiresIn: "HS256" | "HS384" | "HS512" = "HS256";

    public async sign(payload: object): Promise<string> {
        return sign(payload, this.jwtSecret, this.jwtExpiresIn);
    }

    public async verify<T = object>(token: string): Promise<T> {
        return await verify(token, this.jwtSecret);
    }
}

export interface IJwtService {
    sign(payload: object): Promise<string>;
    verify<T = object>(token: string): Promise<T>;
}

export const jwtService = new JwtService();