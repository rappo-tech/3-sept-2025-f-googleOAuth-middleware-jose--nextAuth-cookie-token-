-- CreateTable
CREATE TABLE "public"."AllInstaUser" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userName" TEXT NOT NULL,

    CONSTRAINT "AllInstaUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AllMsgs" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "msg" TEXT NOT NULL,
    "sender" TEXT NOT NULL,

    CONSTRAINT "AllMsgs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AllPost" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "post" TEXT NOT NULL,

    CONSTRAINT "AllPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AllImgs" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "publicUrl" TEXT NOT NULL,

    CONSTRAINT "AllImgs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."AllMsgs" ADD CONSTRAINT "AllMsgs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."AllInstaUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AllPost" ADD CONSTRAINT "AllPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."AllInstaUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AllImgs" ADD CONSTRAINT "AllImgs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."AllInstaUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
