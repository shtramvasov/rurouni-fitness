import { configureStore } from '@reduxjs/toolkit'
import { rurouniAPI } from './api/api'
import userSlice from './slices/userSlice'

export const store = configureStore({
	reducer: {
    [rurouniAPI.reducerPath]: rurouniAPI.reducer,
    userSlice
  },
  middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(rurouniAPI.middleware)
})
