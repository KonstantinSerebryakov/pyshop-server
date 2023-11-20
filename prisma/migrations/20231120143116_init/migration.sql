-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserInfo" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "about" TEXT,

    CONSTRAINT "UserInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshTokens" (
    "id" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RefreshTokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_id_key" ON "UserInfo"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_userId_key" ON "UserInfo"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshTokens_id_key" ON "RefreshTokens"("id");

-- CreateIndex
CREATE INDEX "RefreshTokens_userId_updatedAt_idx" ON "RefreshTokens"("userId", "updatedAt" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "RefreshTokens_deviceId_userId_key" ON "RefreshTokens"("deviceId", "userId");

-- AddForeignKey
ALTER TABLE "UserInfo" ADD CONSTRAINT "UserInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshTokens" ADD CONSTRAINT "RefreshTokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
