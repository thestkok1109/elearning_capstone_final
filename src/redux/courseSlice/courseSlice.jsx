import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    courseList: [],
}

const courseSlice = createSlice({
    name: "courseSlice",
    initialState,
    reducers: {
        setCourseList: (state, action) => {
            state.courseList = action.payload;
        }
    }
});

export const { setCourseList } = courseSlice.actions

export default courseSlice.reducer