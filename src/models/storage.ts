import type { TabDataValue } from "~models"

export type StorageValue = {
  tabData: TabDataValue
  updateTabData: (data: Partial<TabDataValue>) => void
  tabId: number,
  isInProgress: boolean;
}
