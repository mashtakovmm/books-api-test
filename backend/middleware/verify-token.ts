import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../secrets/secrets";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token sent in Request' });
    }
    if (!JWT_SECRET) {
        return res.status(500).json({ error: 'No JWT Secret provided' })
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        req.userID = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}


export default verifyToken