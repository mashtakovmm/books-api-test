import path from 'path';
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(`.env`) });

export const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT SECRET is missing in .env file');
}

