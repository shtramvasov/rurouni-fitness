import { rurouniAPI } from "@store/api/api";

export const passAPI = rurouniAPI.injectEndpoints({
  endpoints: builder => ({
    getPassList: builder.query({
      query: () => '/pass',
      providesTags: ['Pass']
    }),
    getActivePass: builder.query({
      query: ()=> `/pass/active`,
      providesTags: ['Pass']
    })
  })
})

export const { useGetPassListQuery, useGetActivePassQuery } = passAPI;