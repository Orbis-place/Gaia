-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('STATUS');

-- CreateTable
CREATE TABLE "live_channel_message" (
    "message_location" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'STATUS',
    "last_fetched" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "live_channel_message_pkey" PRIMARY KEY ("message_location")
);
