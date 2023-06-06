/*
  Warnings:

  - Made the column `price` on table `courses` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "courses" ALTER COLUMN "price" SET NOT NULL;
