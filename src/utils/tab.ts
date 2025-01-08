export class TabUtils {
  public static async GetActiveTab(): Promise<chrome.tabs.Tab> {
    const queryOptions = { active: true, currentWindow: true }
    const [tab] = await new Promise<chrome.tabs.Tab[]>((resolve, reject) => {
      chrome.tabs.query(queryOptions, (result) => {
        const error = chrome.runtime.lastError
        if (error) {
          console.error(`TabUtils Error: ${error}`)
          reject(new Error(chrome.runtime.lastError.message))
        } else {
          resolve(result)
        }
      })
    })

    return tab
  }
}
