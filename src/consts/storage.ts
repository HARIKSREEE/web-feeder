import { SidePanelState } from "~enums/sidepanel.enum"
import type { TabDataValue } from "~models"
import type { ConfigurationData } from "~models/configuration"

export const StorageKeys = {
  TAB_DATA: "tabData",
  CONFIGURATION_DATA: "configurationData",
  CAN_DRAW: "canDraw",
  SELECTED_CONTENT: "selectedContent"
}

export const defaultTabData: TabDataValue = {
  isTextSelectionActive: false,
  selectedText: [],
  description: "",
  sidePanelState: SidePanelState.NONE
}

export const defaultConfigurationData: ConfigurationData = {
  hostUrl: "",
  hostUrlTemp: ""
}
