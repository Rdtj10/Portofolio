/*
  Warnings:

  - You are about to drop the column `name` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `icon` to the `Language` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_projectId_fkey";

-- AlterTable
ALTER TABLE "Language" ADD COLUMN     "icon" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "name",
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "ownStatus" TEXT,
ADD COLUMN     "pending_reason" TEXT,
ADD COLUMN     "restricted_reason" TEXT,
ADD COLUMN     "roleId" TEXT NOT NULL,
ADD COLUMN     "short_description" TEXT,
ADD COLUMN     "site" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "url" TEXT;

-- DropTable
DROP TABLE "Task";

-- CreateTable
CREATE TABLE "ProjectRole" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectRole_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "ProjectRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
