import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = createAsyncThunk(
	'users/fetchUsersStatus',
	async () => {
		// const { sortBy, order, category, currentPage } = params;
		const { data } = await axios.get(`${baseURL}`);
		return data;
	}
);

const initialState = {
	userData: [],
	status: 'loading', //success | loading | error
};

export const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setUsers: (state, action) => {
			state.userData = action.payload;
		},
	},
	extraReducers: {
		[fetchUsers.pending]: state => {
			state.status = 'loading';
			state.userData = [];
		},
		[fetchUsers.fulfilled]: (state, action) => {
			state.status = 'success';
			state.userData = action.payload;
		},
		[fetchUsers.rejected]: state => {
			state.status = 'error';
			state.userData = [];
		},
	},
});

export const { setUsers } = userSlice.actions;

export default userSlice.reducer;
