import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const userValidateBody = [
    body('email')
        .isEmail()
        .withMessage('The email field must contain a valid email address.')
        .trim(),
    body('password')
        .trim()
        .isLength({ min: 5, max: 15 })
        .withMessage('The password must be between 5 and 15 characters long.'),
    body('username')
        .trim()
        .isLength({ min: 3, max: 10 })
        .withMessage('The username must be between 3 and 10 characters long.')
];


export const userValidateResult = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};