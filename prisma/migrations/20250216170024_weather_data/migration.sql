/*
  Warnings:

  - You are about to drop the column `weatherCondition` on the `WeatherData` table. All the data in the column will be lost.
  - You are about to alter the column `humidity` on the `WeatherData` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `description` to the `WeatherData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `main` to the `WeatherData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sunrise` to the `WeatherData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sunset` to the `WeatherData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visibility` to the `WeatherData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `windDirection` to the `WeatherData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WeatherData" DROP COLUMN "weatherCondition",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "main" TEXT NOT NULL,
ADD COLUMN     "sunrise" INTEGER NOT NULL,
ADD COLUMN     "sunset" INTEGER NOT NULL,
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "visibility" INTEGER NOT NULL,
ADD COLUMN     "windDirection" INTEGER NOT NULL,
ALTER COLUMN "humidity" SET DATA TYPE INTEGER,
ALTER COLUMN "updatedAt" DROP DEFAULT;
