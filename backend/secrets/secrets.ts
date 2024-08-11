import path from 'path';
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(`.env`) });

export const JWT_SECRET = process.env.JWT_SECRET;
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    throw new Error('DATABASE URL is missing in .env file')
} else {
    console.log(DATABASE_URL);
    
}

if (!JWT_SECRET) {
    throw new Error('JWT SECRET is missing in .env file');
}

