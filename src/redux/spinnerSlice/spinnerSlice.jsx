import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false
}

const spinnerSlice = createSlice({
  name: "spinnerSlice",
  initialState,
  reducers: {
    setIsLoadingOn: (state, action) => {
        state.isLoading = true
    },
    setIsLoadingOff: (state, action) => {
        state.isLoading = false
    }
  }
});

export const {setIsLoadingOn, setIsLoadingOff} = spinnerSlice.actions

export default spinnerSlice.reducer