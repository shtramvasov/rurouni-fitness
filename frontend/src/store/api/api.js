import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const rurouniAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  tagTypes: ['Exercises', 'Routines', 'Sessions', 'Pass'],
  endpoints: () => ({}),
});