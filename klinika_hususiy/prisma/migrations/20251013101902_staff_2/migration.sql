/*
  Warnings:

  - You are about to drop the column `experience` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `hired_date` on the `Staff` table. All the data in the column will be lost.
  - You are about to drop the column `specialty` on the `Staff` table. All the data in the column will be lost.
  - Added the required column `posititon` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shift` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Staff" DROP COLUMN "experience",
DROP COLUMN "gender",
DROP COLUMN "hired_date",
DROP COLUMN "specialty",
ADD COLUMN     "posititon" TEXT NOT NULL,
ADD COLUMN     "shift" TEXT NOT NULL;
