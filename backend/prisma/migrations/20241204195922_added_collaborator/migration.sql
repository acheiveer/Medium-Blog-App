-- CreateEnum
CREATE TYPE "Role" AS ENUM ('EDITOR', 'VIEWER');

-- CreateEnum
CREATE TYPE "CollaboratorRole" AS ENUM ('OWNER', 'EDITOR', 'VIEWER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'VIEWER';

-- CreateTable
CREATE TABLE "BlogCollaborator" (
    "id" TEXT NOT NULL,
    "role" "CollaboratorRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "BlogCollaborator_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BlogCollaborator" ADD CONSTRAINT "BlogCollaborator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogCollaborator" ADD CONSTRAINT "BlogCollaborator_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
