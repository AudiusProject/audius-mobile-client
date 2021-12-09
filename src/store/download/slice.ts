import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FetchBlobResponse, StatefulPromise } from 'rn-fetch-blob'

export type DownloadState = typeof initialState

type State = {
  downloadedPercentage: number
  fetchTask: StatefulPromise<FetchBlobResponse>
  trackName: string
  fileName: string
}

const initialState: State = {
  downloadedPercentage: 0,
  fetchTask: null,
  trackName: null,
  fileName: null
}

const slice = createSlice({
  name: 'downloadTrack',
  initialState,
  reducers: {
    setDownloadedPercentage: (state, action: PayloadAction<number>) => {
      state.downloadedPercentage = action.payload
    },
    setFileInfo: (
      state,
      action: PayloadAction<{
        trackName: string
        fileName: string
      }>
    ) => {
      state.trackName = action.payload.trackName
      state.fileName = action.payload.fileName
    },
    setFetchTask: (
      state,
      action: PayloadAction<StatefulPromise<FetchBlobResponse>>
    ) => {
      state.fetchTask = action.payload
    }
  }
})

export const {
  setDownloadedPercentage,
  setFileInfo,
  setFetchTask
} = slice.actions

export default slice.reducer
