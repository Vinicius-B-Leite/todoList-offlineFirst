/*
  Warnings:

  - The `createdat` column on the `tasks` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updatedat` column on the `tasks` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "createdat",
ADD COLUMN     "createdat" TIMESTAMP(3),
DROP COLUMN "updatedat",
ADD COLUMN     "updatedat" TIMESTAMP(3);
