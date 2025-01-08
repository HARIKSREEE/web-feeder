import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import { SidePanelState } from "~enums/sidepanel.enum"
import useTabStorage from "~hooks/useTabStorage"
import { SidePanel } from "~utils/sidePanel"

function Popup() {
  const { tabData, tabId, updateTabData } = useTabStorage()

  const isTextSelectionActive = tabData.isTextSelectionActive

  const handleDrawChange = async () => {
    if (!isTextSelectionActive) {
      SidePanel.OpenSidePanel(tabId)
    }
    updateTabData({
      isTextSelectionActive: !isTextSelectionActive,
      sidePanelState: isTextSelectionActive
        ? SidePanelState.CLOSE
        : SidePanelState.OPEN
    })
    window.close()
  }

  return (
    <Stack minWidth={300}>
      <Typography align="center">
        {isTextSelectionActive
          ? "You can stop the drawing here"
          : "Begin text extraction by clicking the button below. You can draw a box to select the text you want to extract."}
      </Typography>
      <Button onClick={handleDrawChange}>
        {isTextSelectionActive ? "Stop" : "Start"}
      </Button>
    </Stack>
  )
}

export default Popup
