import { rurouniAPI } from "@store/api/api";

export const sessionsSlice = rurouniAPI.injectEndpoints({
  endpoints: builder => ({
    getSessions: builder.query({
      query: () => '/sessions',
      providesTags: ['Sessions']
    }),
    getOneSession: builder.query({
      query: (session_id)=> `/sessions/${session_id}`,
      providesTags: ['Sessions']
    })
  })
})

export const { useGetSessionsQuery, useGetOneSessionQuery } = sessionsSlice;