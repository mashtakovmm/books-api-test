import { PrismaClient } from "@prisma/client";
import { ROLE_FLAGS } from "../utils/roles"; 
const prisma = new PrismaClient();

async function main() {
    await prisma.role.createMany({
        data: [
            {
                name: "Unverified User",
                permissions: ROLE_FLAGS.READ
            },
            {
                name: "Verified User",
                permissions: ROLE_FLAGS.READ
            },
            {
                name: "Admin",
                permissions: ROLE_FLAGS.READ | ROLE_FLAGS.DELETE | ROLE_FLAGS.WRITE | ROLE_FLAGS.MODIFY | ROLE_FLAGS.GRANT_ROLE
            }
        ],
    });
    console.log("Role seeding done")
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
