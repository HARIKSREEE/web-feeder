import { useEffect, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import { MessageType } from "~enums/message.enum"

const useActiveTab = (): [chrome.tabs.Tab | null, boolean] => {
  const [activeTab, setActiveTab] = useState<chrome.tabs.Tab | null>(null);
  const [isInProgress, setIsInProgress] = useState(true);

  useEffect(() => {
    const fetchActiveTab = async () => {
      setIsInProgress(true)
      const tab = await sendToBackground({
        name: MessageType.GET_ACTIVE_TAB
      })
      tab && setActiveTab(tab)
      setIsInProgress(false)
    }
    fetchActiveTab();

    const handleTabActivation = () => {
      fetchActiveTab()
    }

    chrome.tabs?.onActivated.addListener(handleTabActivation)

    return () => {
      chrome.tabs?.onActivated.removeListener(handleTabActivation)
    }
  }, [])

  return [activeTab, isInProgress]
}

export default useActiveTab
