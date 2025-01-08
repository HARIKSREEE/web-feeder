import axios from "axios"
import type { AxiosRequestConfig, AxiosResponse } from "axios"

export abstract class BaseHttpService {
  private static async handleRequest<T>(
    request: Promise<AxiosResponse<T>>
  ): Promise<T> {
    try {
      const response = await request
      return response.data
    } catch (error) {
      console.error(`BaseHttpService: Error: ${error}`)
      return null
    }
  }

  protected static async get<T>(url: string, headers?: Record<string, string>): Promise<T> {
    const config: AxiosRequestConfig = {
      headers
    }
    return this.handleRequest(axios.get<T>(url, config))
  }

  protected static async post<T>(
    url: string,
    data: any,
    headers?: Record<string, string>
  ): Promise<T> {
    const config: AxiosRequestConfig = {
      headers
    }
    console.log(`starting post request to ${url}`);
    return this.handleRequest(axios.post<T>(url, data, config))
  }

  protected static async put<T>(
    url: string,
    data: any,
    headers?: Record<string, string>
  ): Promise<T> {
    const config: AxiosRequestConfig = {
      headers
    }
    return this.handleRequest(axios.put<T>(url, data, config))
  }

  protected static async delete<T>(url: string, headers?: Record<string, string>): Promise<T> {
    const config: AxiosRequestConfig = {
      headers
    }
    return this.handleRequest(axios.delete<T>(url, config))
  }
}
