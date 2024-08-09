import { PrismaClientInitializationError, PrismaClientKnownRequestError, PrismaClientRustPanicError, PrismaClientUnknownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library"
import { Request, Response } from "express"

const errorWrapper = (err: Error, req: Request, res: Response, next: Function) => {
    return res.status(502).json({ error: err })
}

export default errorWrapper