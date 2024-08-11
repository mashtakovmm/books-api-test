import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    await prisma.book.create({
        data: {
            title: "De Mí Para Mí, La Tormenta Pasará (Spanish Edition)",
            author: "Nacarid Portal, Chriss Braund",
            publicationDate: "2023-11-11T00:00:00.000Z",
            genres: ['Grief & Bereavement', 'Poetry for Teens & Young Adults']
        }
    })
    console.log("Seed books");
    
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
