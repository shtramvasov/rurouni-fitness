import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '@utils/fetch';

export const checkAuth = createAsyncThunk(
  'user/checkAuth',
  async () => {
    const response = await axios.get('/auth/check');
    return response.data;
  }
)

const initialState = {
  isAuth: false,
  isLoaded: false,
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isAuth = action.payload.isAuth
      state.user = action.payload.user;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(checkAuth.pending, (state) => {
      state.isLoaded = false;
    })
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isLoaded = true;
      state.isAuth = action.payload.isAuth;
      state.user = action.payload.user;
    })
    builder.addCase(checkAuth.rejected, (state) => {
      state.isLoaded = true;
    })
  }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
