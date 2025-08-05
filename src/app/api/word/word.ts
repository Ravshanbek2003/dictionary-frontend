import {baseApi} from '../baseApi'

export const wordApi = baseApi.injectEndpoints({
  endpoints: build => ({
    addWord: build.mutation<any, any>({
      query: formData => ({
        url: '/word/add',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Word'],
    }),
    getWord: build.query<any[], {search?: string; dictype?: string}>({
      query: ({search, dictype}) => {
        const params = new URLSearchParams()

        if (search) {
          params.append('search', search)
        }

        if (dictype) {
          params.append('dictype', dictype)
        }

        return {
          url: `/word/get-all?${params.toString()}`,
          method: 'GET',
        }
      },
      providesTags: ['Word'],
    }),

    getWordById: build.query<any, string>({
      query: id => ({
        url: `/word/get/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{type: 'Word', id}],
    }),

    updateWord: build.mutation<any, {id: string; data: any}>({
      query: ({id, data}) => ({
        url: `/word/update/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Word'],
    }),

    deleteWord: build.mutation<any, string>({
      query: id => ({
        url: `/word/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Word'],
    }),
  }),
})

export const {
  useAddWordMutation,
  useGetWordQuery,
  useLazyGetWordQuery,
  useGetWordByIdQuery,
  useUpdateWordMutation,
  useDeleteWordMutation,
} = wordApi
