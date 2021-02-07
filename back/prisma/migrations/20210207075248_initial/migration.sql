-- CreateTable
CREATE TABLE "User" (
    "account_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT,

    PRIMARY KEY ("account_id")
);

-- CreateTable
CREATE TABLE "Journal" (
    "journal_id" TEXT NOT NULL,
    "details" JSONB NOT NULL,
    "account_id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,

    PRIMARY KEY ("journal_id")
);

-- CreateTable
CREATE TABLE "Entry" (
    "entry_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "body" TEXT,
    "journal_id" TEXT NOT NULL,

    PRIMARY KEY ("entry_id")
);

-- CreateTable
CREATE TABLE "Game" (
    "game_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "meta" JSONB NOT NULL,

    PRIMARY KEY ("game_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Journal" ADD FOREIGN KEY ("account_id") REFERENCES "User"("account_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Journal" ADD FOREIGN KEY ("game_id") REFERENCES "Game"("game_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry" ADD FOREIGN KEY ("journal_id") REFERENCES "Journal"("journal_id") ON DELETE CASCADE ON UPDATE CASCADE;
