-- CreateIndex
CREATE INDEX `Account_userId_idx` ON `Account`(`userId`);

-- CreateIndex
CREATE INDEX `HoldingItem_itemId_idx` ON `HoldingItem`(`itemId`);

-- CreateIndex
CREATE INDEX `HoldingItem_holdingId_idx` ON `HoldingItem`(`holdingId`);

-- CreateIndex
CREATE INDEX `Instance_addedById_idx` ON `Instance`(`addedById`);

-- CreateIndex
CREATE INDEX `Instance_itemId_idx` ON `Instance`(`itemId`);

-- CreateIndex
CREATE INDEX `Instance_locationId_idx` ON `Instance`(`locationId`);

-- CreateIndex
CREATE INDEX `Issue_assignedToUserId_idx` ON `Issue`(`assignedToUserId`);

-- CreateIndex
CREATE INDEX `Location_holdingId_idx` ON `Location`(`holdingId`);

-- CreateIndex
CREATE INDEX `RemoveInstance_instanceId_idx` ON `RemoveInstance`(`instanceId`);

-- CreateIndex
CREATE INDEX `RemoveInstance_holdingId_idx` ON `RemoveInstance`(`holdingId`);

-- CreateIndex
CREATE INDEX `RemoveInstance_locationId_idx` ON `RemoveInstance`(`locationId`);

-- CreateIndex
CREATE INDEX `RemoveInstance_removedById_idx` ON `RemoveInstance`(`removedById`);

-- CreateIndex
CREATE INDEX `Session_userId_idx` ON `Session`(`userId`);
