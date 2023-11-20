/*
  Warnings:

  - You are about to drop the column `exp` on the `RefreshTokens` table. All the data in the column will be lost.
  - You are about to drop the column `iat` on the `RefreshTokens` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[deviceId]` on the table `RefreshTokens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `deviceId` to the `RefreshTokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `RefreshTokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RefreshTokens" DROP COLUMN "exp",
DROP COLUMN "iat",
ADD COLUMN     "deviceId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RefreshTokens_deviceId_key" ON "RefreshTokens"("deviceId");

-- CreateIndex
CREATE INDEX "RefreshTokens_userId_updatedAt_idx" ON "RefreshTokens"("userId", "updatedAt" ASC);
