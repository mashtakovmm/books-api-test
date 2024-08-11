import { Request, Response } from 'express';
import asyncWrapper from '../middleware/async-wrapper';
import { PrismaClient } from '@prisma/client';
import jwt from "jsonwebtoken";
import { JWT_SECRET } from '../secrets/secrets';
import { ROLE_FLAGS } from '../utils/roles';

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
            username: req.body.username
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

// export const putChangeUserRole = asyncWrapper(async (req: Request, res: Response) => {
//     const userID = req.params.id
//     const user = await prisma.user.findFirst({
//         where: {
//             id: userID
//         },
//         select: {
//             roleFlag: true
//         }
//     })
//     if (!user) {
//         return res.status(404).json({ error: "User not found" })
//     }
//     const newRoleFlag = user.roleFlag | req.body.role
//     const newUserInfo = await prisma.user.update({
//         where: {
//             id: userID
//         },
//         data: {
//             roleFlag: newRoleFlag
//         }
//     })
//     res.status(201).json(newUserInfo)
// })