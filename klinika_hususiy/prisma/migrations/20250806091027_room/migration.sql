-- CreateEnum
CREATE TYPE "public"."RoomType" AS ENUM ('NORMAL', 'ISOLATED_ROOM', 'ISU', 'RECOVERY', 'VIP');

-- CreateTable
CREATE TABLE "public"."Room" (
    "id" SERIAL NOT NULL,
    "type" "public"."RoomType" NOT NULL DEFAULT 'NORMAL',
    "floor" INTEGER NOT NULL,
    "has_air_conditioner" BOOLEAN NOT NULL,
    "patientId" INTEGER NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Room_patientId_key" ON "public"."Room"("patientId");

-- AddForeignKey
ALTER TABLE "public"."Room" ADD CONSTRAINT "Room_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
