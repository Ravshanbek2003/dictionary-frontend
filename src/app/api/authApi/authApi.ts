import {API_TAGS} from '@/constants/api-tags/api-tags'
import {baseApi} from '../baseApi'
import {LoginRequest, LoginResponse, MeRequest, MeResponse} from './types'

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    me: build.query<MeResponse, MeRequest>({
      query: () => ({
        url: '/me',
        method: 'GET',
      }),
      providesTags: [API_TAGS.LOGIN],
    }),
  }),
})

export const {useLoginMutation, useMeQuery} = authApi
