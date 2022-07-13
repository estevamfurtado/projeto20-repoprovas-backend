import pkg from "@prisma/client"; // precisamos instalar esse pacote!

const { PrismaClient } = pkg;
const client = new PrismaClient();

export {client};