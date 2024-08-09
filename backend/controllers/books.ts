import { Request, Response } from 'express';
import asyncWrapper from '../middleware/async-wrapper';
import { PrismaClient } from '@prisma/client';

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
    await prisma.book.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(201).send({success: true})
})