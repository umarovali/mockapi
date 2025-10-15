-- DropForeignKey
ALTER TABLE "public"."prescription" DROP CONSTRAINT "prescription_treatmentId_fkey";

-- AlterTable
ALTER TABLE "public"."prescription" ALTER COLUMN "treatmentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."prescription" ADD CONSTRAINT "prescription_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "public"."treatments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
