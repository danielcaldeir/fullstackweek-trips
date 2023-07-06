/*
  Warnings:

  - You are about to drop the column `endData` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `endData` on the `TripReservation` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `TripReservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "endData",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "TripReservation" DROP COLUMN "endData",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL;
