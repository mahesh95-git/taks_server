-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PROJECT_MANAGER', 'EMPLOYEE', 'ADMIN');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "dueDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'EMPLOYEE';
