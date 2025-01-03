/*
  Warnings:

  - You are about to drop the column `questionsCount` on the `Exam` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Exam" DROP COLUMN "questionsCount",
ADD COLUMN     "answersCount" INTEGER NOT NULL DEFAULT 0;
