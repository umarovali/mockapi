/*
  Warnings:

  - Changed the type of `shift` on the `Staff` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."StaffShift" AS ENUM ('MORNING', 'DAY', 'NIGHT');

-- AlterTable
ALTER TABLE "public"."Staff" DROP COLUMN "shift",
ADD COLUMN     "shift" "public"."StaffShift" NOT NULL;
