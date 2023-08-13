/*
  Warnings:

  - Added the required column `imgUrl` to the `articles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "articles" ADD COLUMN     "imgUrl" TEXT NOT NULL;
