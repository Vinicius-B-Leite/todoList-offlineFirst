/*
  Warnings:

  - The `created_at` column on the `tasks` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updated_at` column on the `tasks` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "created_at",
ADD COLUMN     "created_at" TIMESTAMP(3),
DROP COLUMN "updated_at",
ADD COLUMN     "updated_at" TIMESTAMP(3);
