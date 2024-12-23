-- DropForeignKey
ALTER TABLE `_ordertoproduct` DROP FOREIGN KEY `_OrderToProduct_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ordertoproduct` DROP FOREIGN KEY `_OrderToProduct_B_fkey`;

-- DropForeignKey
ALTER TABLE `address` DROP FOREIGN KEY `Address_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `address` DROP FOREIGN KEY `Address_userId_fkey`;

-- DropForeignKey
ALTER TABLE `blog` DROP FOREIGN KEY `Blog_blogCategoryId_fkey`;

-- DropForeignKey
ALTER TABLE `blog` DROP FOREIGN KEY `Blog_userId_fkey`;

-- DropForeignKey
ALTER TABLE `faq` DROP FOREIGN KEY `Faq_userId_fkey`;

-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `Image_productId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_promotionId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_userId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `productorder` DROP FOREIGN KEY `ProductOrder_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `productorder` DROP FOREIGN KEY `ProductOrder_productId_fkey`;

-- DropForeignKey
ALTER TABLE `productorder` DROP FOREIGN KEY `ProductOrder_promotionId_fkey`;

-- DropForeignKey
ALTER TABLE `promotion` DROP FOREIGN KEY `Promotion_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `promotion` DROP FOREIGN KEY `Promotion_productId_fkey`;

-- RenameIndex
ALTER TABLE `blog` RENAME INDEX `Blog_userId_fkey` TO `Blog_userId_idx`;

-- RenameIndex
ALTER TABLE `productorder` RENAME INDEX `ProductOrder_promotionId_fkey` TO `ProductOrder_promotionId_idx`;
