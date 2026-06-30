import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = Record<string, any>;

const initialState: UserState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<any>) {
      return action.payload;
    },
    clearUser() {
      return {};
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
