import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient();

// export const execute = async (call: () => any) => {
//     try {
//         return await call();
//     }
//     catch (e) { console.error(e); }
//     finally { await db.$disconnect(); }
// }