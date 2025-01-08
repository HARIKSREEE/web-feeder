import type { PlasmoMessaging } from "@plasmohq/messaging"

import type { FeedDataPayload, FeedDataResponse } from "~models/message"
import { FeederService } from "~services/feeder-service"

const feedDataMessageHandler: PlasmoMessaging.MessageHandler<
  FeedDataPayload,
  FeedDataResponse
> = async (req, res) => {
  try {
    const response = await FeederService.feedData(req.body)
    console.log(`feedDataMessageHandler: Response: ${response}`)
    res.send({isSuccess: response });
  } catch (e) {
    console.error(`feedDataMessageHandler: Error: ${e}`)
    res.send({
      isSuccess: false
    })
  }
}

export default feedDataMessageHandler
