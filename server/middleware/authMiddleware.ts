import { UserRequest } from '../types';
const jwt = require('jsonwebtoken');

export const authMiddleware = ({req}:{req:UserRequest}) => {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // separate "Bearer" from "<tokenvalue>"
    if (req.headers.authorization) {
        token = token
            .split(' ')
            .pop()
            .trim();
    }

    // if no token, return request object as is
    if (!token) {
        return req;
    }

    try {
        // decode and attach user data to request object
        const {data} = jwt.verify(token, process.env.JWT_SECRET, {maxAge: process.env.EXPIRATION});
        req.user = data;
    } catch {
        console.log('Invalid token');
    }

    // return updated request object
    return req;
};