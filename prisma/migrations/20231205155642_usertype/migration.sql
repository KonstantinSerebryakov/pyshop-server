/*
  Warnings:

  - You are about to drop the `UserType` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'classic';

-- DropTable
DROP TABLE "UserType";
