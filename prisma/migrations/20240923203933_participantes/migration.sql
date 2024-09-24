-- CreateTable
CREATE TABLE "participantes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "confirmado_is" BOOLEAN NOT NULL DEFAULT false,
    "is_owner" BOOLEAN NOT NULL DEFAULT false,
    "viagem_id" TEXT NOT NULL,
    CONSTRAINT "participantes_viagem_id_fkey" FOREIGN KEY ("viagem_id") REFERENCES "viagens" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
