import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
	user: null,
	status: 'idle',
	repos: [],
	error: null,
}

export const fetchUser = createAsyncThunk(
	'search/fetchUser',
	async username => {
		const response = await axios.get(`https://api.github.com/users/${username}`)
		return response.data
	}
)

export const fetchRepos = createAsyncThunk(
	'search/fetchRepos',
	async username => {
		const response = await axios.get(
			`https://api.github.com/users/${username}/repos`
		)
		return response.data
	}
)

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchUser.pending, state => {
				state.status = 'loading'
			})
			.addCase(fetchUser.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.user = action.payload
			})
			.addCase(fetchUser.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
			.addCase(fetchRepos.pending, state => {
				state.status = 'loading'
			})
			.addCase(fetchRepos.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.repos = action.payload
			})
			.addCase(fetchRepos.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
	},
})

export default searchSlice.reducer
