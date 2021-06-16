import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as apiClient from '../../apiClient'

export type User = {
    name: string;
}

export type UsersState = {
    users: User[]
    loading: boolean;
    error: boolean;
}

const initialState: UsersState = {
    users: [],
    loading: true,
    error: true,
}

// createAsyncThunkの型
// createAsyncThunk<{users: User[]}, {page: number}>
// 1つ目はcreateAsyncThunkの第2引数の関数の返り値
// 2つ目はcreateAsyncThunkの第2引数の関数の第1引数 
export const fetchUsers = createAsyncThunk<{users: User[]}, {page: number}> (
    'fetchUsers',
    async ( {page} ) => {
        const response = await apiClient.fetchUsers(page, 10);
        if (response.kind === 'success') {
            return {
                users: response.body ?? [],
            };
        } else {
            throw 'Error fetching users';
        }
    },
);

const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {},
    extraReducers: ( builder ) => {
        builder
            .addCase(fetchUsers.pending, ( state ) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload.users;
                state.loading = false;
            })
            .addCase(fetchUsers.rejected, (state) => {
                state.error = true;
                state.loading = false;
            });
    }
});

export default usersSlice.reducer;