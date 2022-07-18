-- AlterTable
ALTER TABLE "Passes" ADD COLUMN     "emissionDate" TIMESTAMP(3),
ADD COLUMN     "expirationDate" TIMESTAMP(3),
ADD COLUMN     "fullName" TEXT,
ADD COLUMN     "issuer" TEXT,
ADD COLUMN     "registrationNumber" TEXT;
