import type { SidePanelState } from "~enums/sidepanel.enum"

export type SelectionBoxRect = {
  top: number
  bottom: number
  left: number
  right: number
}

export type TabDataValue = {
  isTextSelectionActive: boolean
  selectedText: string[];
  description: string;
  sidePanelState: SidePanelState;
}

export type TabData = {
  [tabId: number]: TabDataValue;
}
