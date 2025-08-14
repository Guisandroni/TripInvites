-- CreateTable
CREATE TABLE "trips" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "destination" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isConfirmed" BOOLEAN NOT NULL DEFAULT false
);
