import { Request, Response } from 'express';
import asyncWrapper from '../middleware/async-wrapper';
import { PrismaClient } from '@prisma/client';
import { ROLE_FLAGS } from '../utils/roles';


const prisma = new PrismaClient();

export const getAllBooks = asyncWrapper(async (req: Request, res: Response) => {
    const books = await prisma.book.findMany();
    res.status(201).json({
        data: {
            books,
            nbHits: books.length
        }
    });
})

export const postCreateNewBook = asyncWrapper(async (req: Request, res: Response) => {
    const authUserID = req.userID?.id
    const authUserData = await prisma.user.findFirst({
        where: {
            id: authUserID
        },
        select: {
            Role: true
        }
    })

    // exclude 0 as 0 is a possible value for permissions
    if (!authUserData?.Role?.permissions && authUserData?.Role?.permissions !== 0) {
        return res.status(404).json({ error: "Ivalid token\\User not found" })
    }

    if ((authUserData?.Role?.permissions & ROLE_FLAGS.WRITE) !== ROLE_FLAGS.WRITE) {
        return res.status(403).json({ error: "You do not have the permision" })
    }

    const newBook = await prisma.book.create({
        data: {
            title: req.body.title,
            author: req.body.author,
            publicationDate: req.body.publicationDate,
            genres: req.body.genres
        }
    })
    res.status(201).json(newBook);
})

export const getBookById = asyncWrapper(async (req: Request, res: Response) => {
    const book = await prisma.book.findUnique({
        where: {
            id: req.params.id
        }
    })
    res.status(201).json(book)
})

export const putUpdateBookByID = asyncWrapper(async (req: Request, res: Response) => {
    const authUserID = req.userID?.id
    const authUserData = await prisma.user.findFirst({
        where: {
            id: authUserID
        },
        select: {
            Role: true
        }
    })

    // exclude 0 as 0 is a possible value for permissions
    if (!authUserData?.Role?.permissions && authUserData?.Role?.permissions !== 0) {
        return res.status(404).json({ error: "Ivalid token\\User not found" })
    }

    if ((authUserData?.Role?.permissions & ROLE_FLAGS.MODIFY) !== ROLE_FLAGS.MODIFY) {
        return res.status(403).json({ error: "You do not have the permision" })
    }

    const updatedBook = await prisma.book.update({
        where: {
            id: req.params.id
        },
        data: {
            ...req.body
        }
    })
    res.status(201).json(updatedBook)
})

export const deleteBookByID = asyncWrapper(async (req: Request, res: Response) => {
    const authUserID = req.userID?.id
    const authUserData = await prisma.user.findFirst({
        where: {
            id: authUserID
        },
        select: {
            Role: true
        }
    })

    // exclude 0 as 0 is a possible value for permissions
    if (!authUserData?.Role?.permissions && authUserData?.Role?.permissions !== 0) {
        return res.status(404).json({ error: "Ivalid token\\User not found" })
    }

    if ((authUserData?.Role?.permissions & ROLE_FLAGS.DELETE) !== ROLE_FLAGS.DELETE) {
        return res.status(403).json({ error: "You do not have the permision" })
    }

    await prisma.book.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(201).send({ success: true })
})