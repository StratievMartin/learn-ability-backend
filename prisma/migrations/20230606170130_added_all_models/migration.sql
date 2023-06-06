/*
  Warnings:

  - Added the required column `content` to the `articles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoUrl` to the `articles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `lectures` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoUrl` to the `lectures` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'AUTHOR');

-- DropForeignKey
ALTER TABLE "lectures" DROP CONSTRAINT "lectures_courseId_fkey";

-- AlterTable
ALTER TABLE "articles" ADD COLUMN     "authorId" INTEGER,
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "courseId" INTEGER,
ADD COLUMN     "userId" INTEGER,
ADD COLUMN     "videoUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "lectures" ADD COLUMN     "authorId" INTEGER,
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "videoUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "lectureId" INTEGER,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'STUDENT';

-- CreateTable
CREATE TABLE "keywords" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "keywords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "text" TEXT NOT NULL,
    "lectureId" INTEGER,
    "courseId" INTEGER,
    "articleId" INTEGER,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article_keywords" (
    "articleId" INTEGER NOT NULL,
    "keywordId" INTEGER NOT NULL,

    CONSTRAINT "article_keywords_pkey" PRIMARY KEY ("articleId","keywordId")
);

-- CreateTable
CREATE TABLE "course_keywords" (
    "courseId" INTEGER NOT NULL,
    "keywordId" INTEGER NOT NULL,

    CONSTRAINT "course_keywords_pkey" PRIMARY KEY ("courseId","keywordId")
);

-- CreateTable
CREATE TABLE "_CourseKeywords" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CourseAuthors" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CourseStudents" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ArticleKeywords" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CourseKeywords_AB_unique" ON "_CourseKeywords"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseKeywords_B_index" ON "_CourseKeywords"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CourseAuthors_AB_unique" ON "_CourseAuthors"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseAuthors_B_index" ON "_CourseAuthors"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CourseStudents_AB_unique" ON "_CourseStudents"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseStudents_B_index" ON "_CourseStudents"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ArticleKeywords_AB_unique" ON "_ArticleKeywords"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticleKeywords_B_index" ON "_ArticleKeywords"("B");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_lectureId_fkey" FOREIGN KEY ("lectureId") REFERENCES "lectures"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lectures" ADD CONSTRAINT "lectures_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lectures" ADD CONSTRAINT "lectures_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_lectureId_fkey" FOREIGN KEY ("lectureId") REFERENCES "lectures"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "articles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_keywords" ADD CONSTRAINT "article_keywords_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "articles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_keywords" ADD CONSTRAINT "article_keywords_keywordId_fkey" FOREIGN KEY ("keywordId") REFERENCES "keywords"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_keywords" ADD CONSTRAINT "course_keywords_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_keywords" ADD CONSTRAINT "course_keywords_keywordId_fkey" FOREIGN KEY ("keywordId") REFERENCES "keywords"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseKeywords" ADD CONSTRAINT "_CourseKeywords_A_fkey" FOREIGN KEY ("A") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseKeywords" ADD CONSTRAINT "_CourseKeywords_B_fkey" FOREIGN KEY ("B") REFERENCES "keywords"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseAuthors" ADD CONSTRAINT "_CourseAuthors_A_fkey" FOREIGN KEY ("A") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseAuthors" ADD CONSTRAINT "_CourseAuthors_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseStudents" ADD CONSTRAINT "_CourseStudents_A_fkey" FOREIGN KEY ("A") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseStudents" ADD CONSTRAINT "_CourseStudents_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleKeywords" ADD CONSTRAINT "_ArticleKeywords_A_fkey" FOREIGN KEY ("A") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleKeywords" ADD CONSTRAINT "_ArticleKeywords_B_fkey" FOREIGN KEY ("B") REFERENCES "keywords"("id") ON DELETE CASCADE ON UPDATE CASCADE;
