/*
  Warnings:

  - You are about to drop the column `confirmado_is` on the `participantes` table. All the data in the column will be lost.
  - You are about to drop the column `confirmado_is` on the `viagens` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_participantes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "is_confirmado" BOOLEAN NOT NULL DEFAULT false,
    "is_owner" BOOLEAN NOT NULL DEFAULT false,
    "viagem_id" TEXT NOT NULL,
    CONSTRAINT "participantes_viagem_id_fkey" FOREIGN KEY ("viagem_id") REFERENCES "viagens" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_participantes" ("email", "id", "is_owner", "nome", "viagem_id") SELECT "email", "id", "is_owner", "nome", "viagem_id" FROM "participantes";
DROP TABLE "participantes";
ALTER TABLE "new_participantes" RENAME TO "participantes";
CREATE TABLE "new_viagens" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "destination" TEXT NOT NULL,
    "inicio_at" DATETIME NOT NULL,
    "final_at" DATETIME NOT NULL,
    "criado_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_confirmado" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_viagens" ("criado_at", "destination", "final_at", "id", "inicio_at") SELECT "criado_at", "destination", "final_at", "id", "inicio_at" FROM "viagens";
DROP TABLE "viagens";
ALTER TABLE "new_viagens" RENAME TO "viagens";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
