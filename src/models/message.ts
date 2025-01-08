export type ExtractTextPayload = {
  dataUri: string
}

export type ExtractTextResponse = {
  text: string
}

export type ManageSidePanelPayload = {
  open: boolean
};


export type FeedDataPayload = {
  text: string
  description?: string
}

export type FeedDataResponse = {
  isSuccess: boolean
}
