import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Status from 'audius-client/src/common/models/Status'

export type CognitoState = {
  isVisible: boolean
  uri: string
  fetchUriState?: Status
}

const initialState: CognitoState = {
  isVisible: false,
  uri: ''
}

const slice = createSlice({
  name: 'cognito',
  initialState,
  reducers: {
    setVisible: (state, action: PayloadAction<boolean>) => {
      state.isVisible = action.payload
    },
    fetchUri: state => {
      state.fetchUriState = Status.LOADING
    },
    fetchUriFailed: state => {
      state.fetchUriState = Status.ERROR
    },
    fetchUriSucceeded: (state, action: PayloadAction<{ uri: string }>) => {
      state.fetchUriState = Status.SUCCESS
      state.uri = action.payload.uri
    }
  }
})

export const {
  setVisible,
  fetchUri,
  fetchUriFailed,
  fetchUriSucceeded
} = slice.actions

export default slice.reducer
