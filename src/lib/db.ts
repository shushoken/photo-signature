import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
export async function getUserByEmail(email: string) {
    return await prisma.user.findUnique({
        where: {
            email,
        },
    });
}

export async function getECDSAKey(userId: string) {
    return await prisma.eCDSAKey.findUnique({
        where: {
            userId,
        },
    });
}

export async function deleteECDSAKey(userId: string) {
    return await prisma.eCDSAKey.delete({
        where: {
            userId,
        },
    });
}

export async function createECDSAKey(userId: string, privateKey: string, publicKey: string) {
    return await prisma.eCDSAKey.create({
        data: {
            userId,
            privateKey,
            publicKey
        },
    });
}
