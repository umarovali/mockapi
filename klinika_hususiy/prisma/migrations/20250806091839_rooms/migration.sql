/*
  Warnings:

  - Added the required column `finish_date` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reserved_date` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Room" ADD COLUMN     "finish_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "reserved_date" TIMESTAMP(3) NOT NULL;
