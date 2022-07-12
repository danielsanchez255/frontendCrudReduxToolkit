import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../api';

interface UserState {
  users: {},
  isLoading: boolean
}

const initialState = { users: [], isLoading: false } as UserState

export const createUser = createAsyncThunk<void, {}>(
  "users/createUser",
  async ( userData ) => {    
    const res = await api.createUser({ userData });
    return res.data;
  }
);

export const deleteUser = createAsyncThunk<string, string>(
  "users/deleteUser",
  async ( id: string ) => {
    await api.deleteUser(id);
    return id;
  }
);

export const findUserById = createAsyncThunk(
  "users/findByTitle",
  async ( id ) => {
    const res = await api.fetchUserById(id);
    //return res.data;
  }
);

export const fetchUsers = createAsyncThunk<{}, void>(
  "users/fetchAllUsers",
  async () => {
    const res: any = await api.fetchUsers();
    return res.data;
  }
);

export const updateUser = createAsyncThunk<void, { user: any }>(
  "users/updateUser",
  async ( user: any ) => {
    const res = await api.updateUser(user._id, user);
    return res.data;
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      if (Array.isArray(state.users)) {
        state.users.push(action.payload);
      }
      state.isLoading = false;
    });

    builder.addCase(fetchUsers.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });

    builder.addCase(updateUser.fulfilled, (state, action: any) => {
      console.log("Action: ", action);
      if (Array.isArray(state.users)) {
        state.users = state.users.map((user) => user._id === action.payload._id ? action.payload : user);
      }
      state.isLoading = false;
    });

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      if (Array.isArray(state.users)) {
        state.users = state.users.filter((user) => user._id !== action.payload);
      }
      state.isLoading = false;
    });

    builder.addCase(findUserById.fulfilled, (state, action) => {
      //return [...state, action.payload];
    });
  },
});
const { reducer } = userSlice;
export default reducer;