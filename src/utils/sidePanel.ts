export class SidePanel {
  public static OpenSidePanel(tabId: number) {
    chrome.sidePanel.open({ tabId: tabId })
  }
}
