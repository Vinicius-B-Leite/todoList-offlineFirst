-- CreateTable
CREATE TABLE "Tasks" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" INTEGER,
    "updated_at" INTEGER,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);
