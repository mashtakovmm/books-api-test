import { Request, Response } from 'express';
import asyncWrapper from '../middleware/async-wrapper';
import { PrismaClient } from '@prisma/client';
import jwt from "jsonwebtoken";
import { JWT_SECRET } from '../secrets/secrets';

const prisma = new PrismaClient();

export const postLoginUser = asyncWrapper(async (req: Request, res: Response) => {
    if (JWT_SECRET) {
        const user = await prisma.user.findFirst({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        })
        const token = jwt.sign(
            {
                id: user?.id
            }, JWT_SECRET,
            { expiresIn: '1h' }
        )
        res.status(201).json(token)
    }
})

export const postRegisterUser = asyncWrapper(async (req: Request, res: Response) => {
    const newUser = await prisma.user.create({
        data: {
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
        }
    })
    res.status(201).json(newUser)
})

export const getUserInfo = asyncWrapper(async (req: Request, res: Response) => {
    const userID = req.userID?.id
    const userInfo = await prisma.user.findFirst({
        where: {
            id: userID
        }
    })
    res.status(201).json(userInfo)
})

export const putChangeUserRole = asyncWrapper(async (req: Request, res: Response) => {
    const roleIdNumber = parseInt(req.body.roleId, 10);
    const totalRoles = await prisma.role.count();

    if ( !roleIdNumber || roleIdNumber > totalRoles) {
        return res.status(400).json({ error: "Invalid Role ID" });
    }

    const newUserInfo = await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            roleId: roleIdNumber
        }
    })
    res.status(201).json(newUserInfo)
})