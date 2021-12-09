import { AppState } from 'app/store'

export const getDownloadedPercentage = (state: AppState) =>
  state.downloads.downloadedPercentage
export const getFileName = (state: AppState) => state.downloads.fileName
export const getFetchTask = (state: AppState) => state.downloads.fetchTask
export const getTrackName = (state: AppState) => state.downloads.trackName
