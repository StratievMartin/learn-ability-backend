-- AlterTable
ALTER TABLE "courses" ALTER COLUMN "price" DROP NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;