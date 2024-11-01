import jwt from 'jsonwebtoken';

import { ITokenPayload } from './types/token.interface';

const APP_SECRET: string = 'GraphQL-is-aw3some';


function getTokenPayload(token: string): ITokenPayload {
    return jwt.verify(token, APP_SECRET) as ITokenPayload;
}

function getUserId(req?: {headers:{ authorization?: string }}, authToken?: string): string {
    if (req) {
        const authHeader: string | undefined = req.headers.authorization;
        if (authHeader) {
            const token: string | undefined = authHeader.replace('Bearer ', '');
            if (!token) {
                throw new Error('No token found');
            }
            const { userId } = getTokenPayload(token);
            return userId;
        }
    } else if (authToken) {
        const { userId } = getTokenPayload(authToken);
        return userId;
    }
    throw new Error('Not authenticated');
}

export { APP_SECRET, getUserId };