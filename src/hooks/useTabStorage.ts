import { useStorage } from "@plasmohq/storage/hook"

import { defaultTabData, StorageKeys } from "~consts/storage"
import type { TabData, TabDataValue } from "~models"
import type { StorageValue } from "~models/storage"

import useActiveTab from "./useActiveTab"

const useTabStorage = (): StorageValue => {
  const [tab, isInProgress] = useActiveTab();
  const [tabData, setTabData, { isLoading }] = useStorage<TabData>(
    StorageKeys.TAB_DATA,
    (v) => (v === undefined ? {} : v)
  );

  const updateTabData = (data: Partial<TabDataValue>) => {
    setTabData((prev) => {
      const currentTabData = prev[tab.id] ?? defaultTabData
      return {
        ...prev,
        [tab.id]: {
          ...currentTabData,
          ...data
        }
      }
    })
  };

  const currentTabData = tabData[tab?.id] || defaultTabData

  return {
    tabData: currentTabData,
    updateTabData,
    tabId: tab?.id,
    isInProgress: isInProgress || isLoading
  };
}

export default useTabStorage
