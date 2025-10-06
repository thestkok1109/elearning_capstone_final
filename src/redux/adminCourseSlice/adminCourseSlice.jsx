import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    course: {}
}

const adminCourseSlice = createSlice({
  name: "adminCourseSlice",
  initialState,
  reducers: {
    setCourse: (state, action) => {
        state.course = action.payload
    }
  }
});

export const { setCourse } = adminCourseSlice.actions

export default adminCourseSlice.reducer