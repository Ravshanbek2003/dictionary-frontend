import {API_TAGS} from '@/constants/api-tags/api-tags'
import {useStorage} from '@/utils/storage'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dictionary-backend-7m19.onrender.com',
    prepareHeaders: headers => {
      const token = useStorage.getTokens()?.accessToken
      if (token) {
        headers.set('Authorization', `${token}`)
      }
      return headers
    },
  }),
  tagTypes: Object.values(API_TAGS),
  endpoints: () => ({}),
})

export default baseApi
