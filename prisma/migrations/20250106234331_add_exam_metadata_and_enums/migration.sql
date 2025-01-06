-- CreateEnum
CREATE TYPE "Grade" AS ENUM ('FIRST_GRADE', 'SECOND_GRADE', 'THIRD_GRADE', 'FOURTH_GRADE', 'FIFTH_GRADE', 'SIXTH_GRADE', 'SEVENTH_GRADE', 'EIGHTH_GRADE', 'NINTH_GRADE', 'TENTH_GRADE', 'ELEVENTH_GRADE', 'TWELFTH_GRADE', 'UNIVERSITY', 'PROFESSIONAL');

-- CreateEnum
CREATE TYPE "Subject" AS ENUM ('MATHEMATICS', 'SCIENCE', 'HISTORY', 'LANGUAGE', 'LITERATURE', 'PHYSICS', 'CHEMISTRY', 'BIOLOGY', 'GEOGRAPHY', 'ARTS', 'MUSIC', 'PHYSICAL_EDUCATION', 'TECHNOLOGY', 'OTHER');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "ExamStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- AlterTable
ALTER TABLE "Exam" ADD COLUMN     "description" TEXT,
ADD COLUMN     "difficulty" "Difficulty" DEFAULT 'MEDIUM',
ADD COLUMN     "grade" "Grade",
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "status" "ExamStatus" DEFAULT 'DRAFT',
ADD COLUMN     "subject" "Subject";

-- CreateIndex
CREATE INDEX "Exam_grade_idx" ON "Exam"("grade");

-- CreateIndex
CREATE INDEX "Exam_subject_idx" ON "Exam"("subject");
