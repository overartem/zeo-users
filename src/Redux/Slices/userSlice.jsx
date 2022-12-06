import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = createAsyncThunk(
	'users/fetchUsersStatus',
	async () => {
		const { data } = await axios.get(`${baseURL}`);
		return data;
	}
);

const initialState = {
	userData: [],
	sortedUserData: [],
	searchValue: '',
	countUser: 0,
	status: 'loading', //success | loading | error
};

export const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setSearchValue(state, action) {
			state.searchValue = action.payload;
		},
		getSortedUsers(state) {
			state.sortedUserData = state.userData.filter(item => {
				return item.name.toLowerCase().includes(state.searchValue.toLowerCase())
					? true
					: false;
			});
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
			state.sortedUserData = state.userData;
			state.countUser = state.userData.length;
		},
		[fetchUsers.rejected]: state => {
			state.status = 'error';
			state.userData = [];
		},
	},
});

export const { setSearchValue, getSortedUsers } = userSlice.actions;

export default userSlice.reducer;
