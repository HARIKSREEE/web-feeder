import type { PlasmoMessaging } from "@plasmohq/messaging"

import { TabUtils } from "~utils/tab"

const getActiveTabMessageHandler: PlasmoMessaging.MessageHandler<
  void,
  chrome.tabs.Tab
> = async (_, response) => {
  const tab = await TabUtils.GetActiveTab()
  response.send(tab)
}

export default getActiveTabMessageHandler
