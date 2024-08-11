import { NextFunction, Request, Response } from "express"

const errorWrapper = (err: Error, req: Request, res: Response, next: NextFunction) => {
    return res.status(502).json({ error: err })
}

export default errorWrapper