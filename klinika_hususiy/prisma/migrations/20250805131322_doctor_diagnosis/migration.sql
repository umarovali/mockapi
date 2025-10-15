/*
  Warnings:

  - Added the required column `doctorId` to the `diagnosis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."diagnosis" ADD COLUMN     "doctorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."diagnosis" ADD CONSTRAINT "diagnosis_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "public"."Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
