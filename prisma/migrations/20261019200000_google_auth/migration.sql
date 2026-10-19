-- Gli utenti che si registrano con Google non hanno una password locale.
ALTER TABLE "users" ALTER COLUMN "passwordHash" DROP NOT NULL;

-- Identificativo ("sub") dell'account Google collegato all'utente.
ALTER TABLE "users" ADD COLUMN "googleId" TEXT;

CREATE UNIQUE INDEX "users_googleId_key" ON "users"("googleId");
