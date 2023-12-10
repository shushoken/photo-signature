-- CreateTable
CREATE TABLE "ECDSAKey" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "privateKey" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,

    CONSTRAINT "ECDSAKey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ECDSAKey_userId_key" ON "ECDSAKey"("userId");

-- AddForeignKey
ALTER TABLE "ECDSAKey" ADD CONSTRAINT "ECDSAKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
