/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `EmailToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token` to the `EmailToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmailToken" ADD COLUMN     "token" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "EmailToken_token_key" ON "EmailToken"("token");
