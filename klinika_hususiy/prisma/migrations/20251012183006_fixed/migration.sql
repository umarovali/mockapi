/*
  Warnings:

  - The values [OWNER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `clinicId` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `diagnosisId` on the `prescription` table. All the data in the column will be lost.
  - You are about to drop the column `langId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `appointment_tests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `clinics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `diagnosis` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `district` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lang` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `prescription_medicines` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `regions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reviews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `test_payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tests` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `prescriptionId` to the `medicines` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."Role_new" AS ENUM ('ADMIN', 'PATIENT', 'DOCTOR', 'STAFF');
ALTER TABLE "public"."users" ALTER COLUMN "role" TYPE "public"."Role_new" USING ("role"::text::"public"."Role_new");
ALTER TYPE "public"."Role" RENAME TO "Role_old";
ALTER TYPE "public"."Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."Doctor" DROP CONSTRAINT "Doctor_clinicId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Room" DROP CONSTRAINT "Room_patientId_fkey";

-- DropForeignKey
ALTER TABLE "public"."appointment_tests" DROP CONSTRAINT "appointment_tests_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."appointment_tests" DROP CONSTRAINT "appointment_tests_testId_fkey";

-- DropForeignKey
ALTER TABLE "public"."clinics" DROP CONSTRAINT "clinics_districtId_fkey";

-- DropForeignKey
ALTER TABLE "public"."clinics" DROP CONSTRAINT "clinics_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."diagnosis" DROP CONSTRAINT "diagnosis_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."diagnosis" DROP CONSTRAINT "diagnosis_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."district" DROP CONSTRAINT "district_regionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."prescription" DROP CONSTRAINT "prescription_diagnosisId_fkey";

-- DropForeignKey
ALTER TABLE "public"."prescription_medicines" DROP CONSTRAINT "prescription_medicines_medicineId_fkey";

-- DropForeignKey
ALTER TABLE "public"."prescription_medicines" DROP CONSTRAINT "prescription_medicines_prescriptionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."reviews" DROP CONSTRAINT "reviews_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."reviews" DROP CONSTRAINT "reviews_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."test_payment" DROP CONSTRAINT "test_payment_appointmentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."test_payment" DROP CONSTRAINT "test_payment_testId_fkey";

-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_langId_fkey";

-- AlterTable
ALTER TABLE "public"."Doctor" DROP COLUMN "clinicId";

-- AlterTable
ALTER TABLE "public"."medicines" ADD COLUMN     "prescriptionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."prescription" DROP COLUMN "diagnosisId";

-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "langId";

-- DropTable
DROP TABLE "public"."Room";

-- DropTable
DROP TABLE "public"."appointment_tests";

-- DropTable
DROP TABLE "public"."clinics";

-- DropTable
DROP TABLE "public"."diagnosis";

-- DropTable
DROP TABLE "public"."district";

-- DropTable
DROP TABLE "public"."lang";

-- DropTable
DROP TABLE "public"."prescription_medicines";

-- DropTable
DROP TABLE "public"."regions";

-- DropTable
DROP TABLE "public"."reviews";

-- DropTable
DROP TABLE "public"."test_payment";

-- DropTable
DROP TABLE "public"."tests";

-- DropEnum
DROP TYPE "public"."IllnessType";

-- DropEnum
DROP TYPE "public"."RoomType";

-- DropEnum
DROP TYPE "public"."TestType";

-- AddForeignKey
ALTER TABLE "public"."medicines" ADD CONSTRAINT "medicines_prescriptionId_fkey" FOREIGN KEY ("prescriptionId") REFERENCES "public"."prescription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
