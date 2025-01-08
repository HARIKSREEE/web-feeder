import { useStorage } from "@plasmohq/storage/hook"

import { defaultConfigurationData, StorageKeys } from "~consts/storage"
import type { ConfigurationData } from "~models/configuration"

const useConfiguration = () => {
  const [configurationData, setConfigurationData, { isLoading }] =
    useStorage<ConfigurationData>(StorageKeys.CONFIGURATION_DATA, (v) =>
      v === undefined ? defaultConfigurationData : v
    )

  const updateConfigurationData = (data: Partial<ConfigurationData>) => {
    setConfigurationData((prev) => ({
      ...prev,
      ...data
    }))
  }

  return {
    configurationData,
    updateConfigurationData,
    isLoading
  }
}

export default useConfiguration
