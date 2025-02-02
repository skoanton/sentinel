import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/* async function main() {
    await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'john.doe@example.com',
        },
    });

    console.log('Seed data created');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    }); */