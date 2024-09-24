-- CreateTable
CREATE TABLE "viagens" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "destination" TEXT NOT NULL,
    "inicio_at" DATETIME NOT NULL,
    "final_at" DATETIME NOT NULL,
    "criado_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confirmado_is" BOOLEAN NOT NULL DEFAULT false
);
