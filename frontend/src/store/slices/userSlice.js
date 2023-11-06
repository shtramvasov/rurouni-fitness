import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { LoadingStatus } from '@constants/LoadingStatus';
import axios from '@utils/fetch';

export const checkAuth = createAsyncThunk(
  'user/checkAuth',
  async () => {
    const response = await axios.get('/auth/check');
    return response.data;
  }
)

export const loginUser = createAsyncThunk('user/login', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('/auth/login', userData );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
});

export const registerUser = createAsyncThunk('user/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
});

const initialState = {
  isAuth: false,
  isLoaded: false,
  loadingStatus: LoadingStatus.IDLE,
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isAuth = action.payload.isAuth
      state.user = action.payload.user;
    },
    clearErrorMessage: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    // checkAuth
    builder.addCase(checkAuth.pending, (state) => {
      state.isLoaded = false;
      state.loadingStatus = LoadingStatus.PENDING;
    })
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isLoaded = true;
      state.isAuth = action.payload.isAuth;
      state.user = action.payload.user;
      state.loadingStatus = LoadingStatus.FULFILLED;
    })
    builder.addCase(checkAuth.rejected, (state) => {
      state.isLoaded = true;
      state.loadingStatus = LoadingStatus.REJECTED;
    })

    // login
    builder.addCase(loginUser.pending, (state) => {
      state.isLoaded = false;
      state.loadingStatus = LoadingStatus.PENDING;
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoaded = true;
      state.isAuth = action.payload.isAuth;
      state.user = action.payload.user;
      state.loadingStatus = LoadingStatus.FULFILLED;
    })
    builder.addCase(loginUser.rejected, (state) => {
      state.isLoaded = true;
      state.loadingStatus = LoadingStatus.REJECTED;
    }) 
    
    // register
    builder.addCase(registerUser.pending, (state) => {
      state.isLoaded = false;
      state.loadingStatus = LoadingStatus.PENDING;
    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoaded = true;
      state.isAuth = action.payload.isAuth;
      state.user = action.payload.user;
      state.loadingStatus = LoadingStatus.FULFILLED;
    })
    builder.addCase(registerUser.rejected, (state) => {
      state.isLoaded = true;
      state.loadingStatus = LoadingStatus.REJECTED;
    }) 
  }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
