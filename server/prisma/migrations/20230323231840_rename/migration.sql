/*
  Warnings:

  - You are about to drop the `Tasks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Tasks";

-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" INTEGER,
    "updated_at" INTEGER,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);
