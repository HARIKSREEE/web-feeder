import { StorageKeys } from "~consts/storage"
import type { ConfigurationData } from "~models/configuration"
import type { FeedDataPayload, FeedDataResponse } from "~models/message"

import { BaseHttpService } from "./base/base-http-service"

export class FeederService extends BaseHttpService {
  public static async feedData(payload: FeedDataPayload): Promise<boolean> {
    console.log(`Getting host url`)
    const hostUrl = await this.getHostUrl()
    console.log(`received host url: ${hostUrl}`)

    try {
      await this.post<FeedDataResponse>(`${hostUrl}/vectorize`, payload)
      return true
    } catch (error) {
      console.error(`FeederService: Error: ${error}`)
      return false
    }
  }

  private static async getHostUrl(): Promise<string> {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(
        StorageKeys.CONFIGURATION_DATA,
        (result: { configurationData: string }) => {
          const data = JSON.parse(result.configurationData) as ConfigurationData
          if (!data || !data.hostUrl) {
            reject(null)
          } else {
            resolve(data.hostUrl)
          }
        }
      )
    })
  }
}
