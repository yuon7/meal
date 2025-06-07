/*
  Warnings:

  - You are about to drop the `RecomendedRestaurant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RecomendedRestaurant" DROP CONSTRAINT "RecomendedRestaurant_restaurantId_fkey";

-- DropForeignKey
ALTER TABLE "RecomendedRestaurant" DROP CONSTRAINT "RecomendedRestaurant_roomId_fkey";

-- DropTable
DROP TABLE "RecomendedRestaurant";

-- CreateTable
CREATE TABLE "RecommendedRestaurant" (
    "id" TEXT NOT NULL,
    "recommendReason" TEXT NOT NULL,
    "matchScore" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "roomId" TEXT,
    "restaurantId" TEXT NOT NULL,
    "isSelected" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecommendedRestaurant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RecommendedRestaurant" ADD CONSTRAINT "RecommendedRestaurant_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecommendedRestaurant" ADD CONSTRAINT "RecommendedRestaurant_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
