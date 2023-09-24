import { rurouniAPI } from "@store/api/api";

export const routinesAPI = rurouniAPI.injectEndpoints({
  endpoints: builder => ({
    getRoutines: builder.query({
      query: () => '/routines',
      providesTags: ['Routines']
    }),
    getActiveRoutines: builder.query({
      query: () => '/routines/active',
      providesTags: ['Routines']
    }),
    getOneRoutine: builder.query({
      query: (routine_id)=> `/routines/${routine_id}`,
      providesTags: ['Routines']
    })
  })
})

export const { useGetRoutinesQuery, useGetActiveRoutinesQuery, useGetOneRoutineQuery } = routinesAPI;