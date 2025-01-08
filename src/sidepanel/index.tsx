import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import Container from "@mui/material/Container"
import TextField from "@mui/material/TextField"
import { useEffect, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import { MessageType } from "~enums/message.enum"
import { SidePanelState } from "~enums/sidepanel.enum"
import useTabStorage from "~hooks/useTabStorage";


const SidePanel = () => {
  const { tabData, updateTabData, isInProgress } = useTabStorage()

  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (tabData.sidePanelState == SidePanelState.CLOSE) {
      window.close()
    }
  }, [tabData.sidePanelState, isInProgress])

  const selectedContent = tabData.selectedText || []
  const description = tabData.description || ""

  const data = selectedContent.reduce((acc, curr) => {
    return acc + curr + "\n"
  }, "")

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(event.target.value)
    updateTabData({ description: event.target.value })
  }

  const handleClear = () => {
    updateTabData({ description: "", selectedText: [] })
  }

  const handleSave = async () => {
    setIsSaving(true)
    const response = await sendToBackground({
      name: MessageType.FEED_DATA,
      body: {
        text: data,
        description: description
      }
    })
    console.log("Response: handleSave", response)
    if (response.isSuccess) {
      handleClear()
    }
    console.log("Response: handleSave", response)
    setIsSaving(false)
  }
  return (
      <Container
        maxWidth="lg"
        sx={{
          height: "100vh",
          padding: "20px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
        }}>
        <TextField
          label={
            !!selectedContent.length
              ? "Selected Content"
              : "Start by selecting content from web page"
          }
          multiline
          size="medium"
          fullWidth={true}
          sx={{ resize: "both" }}
          value={data}
          disabled
          maxRows={20}
          minRows={10}
        />
        <TextField
          label="Description for the selected content (optional)"
          multiline
          size="medium"
          fullWidth={true}
          value={description}
          disabled={isSaving}
          onChange={handleDescriptionChange}
        />
        <Button disabled={isSaving} onClick={handleClear} type="button">
          Clear
        </Button>
        <Button disabled={isSaving} onClick={handleSave} type="button">
          Feed
        </Button>
        {isSaving && <CircularProgress />}
      </Container>
  )
}

export default SidePanel
