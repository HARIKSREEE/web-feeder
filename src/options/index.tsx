import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography
} from "@mui/material"
import { useEffect, useState, type ChangeEvent } from "react"

import useConfiguration from "~hooks/useConfiguration"

const Options = () => {
  const { configurationData, updateConfigurationData } = useConfiguration()

  const [hasChange, setHasChange] = useState(false)

  const handleHostUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHasChange(true)
    updateConfigurationData({ hostUrlTemp: e.target.value })
  }

  const handleSave = () => {
    updateConfigurationData({ hostUrl: configurationData.hostUrlTemp });
    setHasChange(false)
  }

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
        <Typography component="h1" variant="h5" width="100%">
          Web feeder configuration
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1, width: "100%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="feeder-host"
            label="Feeder Host"
            name="feeder-host"
            autoComplete="feeder-host"
            value={
              hasChange
                ? configurationData.hostUrlTemp
                : configurationData.hostUrl
            }
            autoFocus
            onChange={handleHostUrlChange}
          />
          <Button disabled={!hasChange} onClick={handleSave}>Save</Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Options
