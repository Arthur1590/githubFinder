import { configureStore } from '@reduxjs/toolkit'
import SearchSlice from '../searchSlice/SearchSlice'

export const store = configureStore({
	reducer: {
		search: SearchSlice,
	},
})
