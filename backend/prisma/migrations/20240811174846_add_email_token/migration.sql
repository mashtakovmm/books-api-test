-- AlterTable
ALTER TABLE "User" ADD COLUMN     "tokenId" TEXT;

-- CreateTable
CREATE TABLE "EmailToken" (
    "id" TEXT NOT NULL,

    CONSTRAINT "EmailToken_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "EmailToken"("id") ON DELETE SET NULL ON UPDATE CASCADE;
