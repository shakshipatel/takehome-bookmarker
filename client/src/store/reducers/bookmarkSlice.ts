import { SLICE_NAMES } from "@/constants/enums"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  bookmarks: []
}

const bookmarkSlice = createSlice({
  name: SLICE_NAMES.BOOKMARK,
  initialState,
  reducers: {
    setBookmarks: (state, actions) => {
      return {
        ...state,
        bookmarks: actions.payload
      }
    },
  }
})

export const { setBookmarks } = bookmarkSlice.actions

export default bookmarkSlice.reducer