-- CreateEnum
CREATE TYPE "public"."RiskLevel" AS ENUM ('LOW', 'MODERATE', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "public"."LastVisitType" AS ENUM ('EMERGENCY', 'FOLLOWUP', 'CONSULTATION', 'MENTAL_HEALTH', 'CHECKUP');

-- AlterTable
ALTER TABLE "public"."diagnosis" ADD COLUMN     "last_visit_type" "public"."LastVisitType" NOT NULL DEFAULT 'CHECKUP',
ADD COLUMN     "risk_level" "public"."RiskLevel" NOT NULL DEFAULT 'LOW';
