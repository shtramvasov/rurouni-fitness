import { rurouniAPI } from "@store/api/api";

export const exercisesAPI = rurouniAPI.injectEndpoints({
  endpoints: builder => ({
    getExercises: builder.query({
      query: () => '/exercises',
      providesTags: ['Exercises']
    }),
    getOneExercise: builder.query({
      query: (exercise_id)=> `/exercises/${exercise_id}`,
      providesTags: ['Exercises']
    })
  })
})

export const { useGetExercisesQuery, useGetOneExerciseQuery } = exercisesAPI;
