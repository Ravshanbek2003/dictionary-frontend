import {baseApi} from '../baseApi'

export const dictionaryApi = baseApi.injectEndpoints({
  endpoints: build => ({
    // POST: Lug'at qo‘shish
    addDictionary: build.mutation<any, any>({
      query: formData => ({
        url: '/dictionary/add',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Dictionary'],
    }),
    getDictionaries: build.query<any[], {search?: string}>({
      query: ({search}) => {
        const params = new URLSearchParams()

        if (search) {
          params.append('search', search)
        }

        return {
          url: `/dictionary/get-all?${params.toString()}`,
          method: 'GET',
        }
      },
      providesTags: ['Dictionary'],
    }),

    // GET: Bitta lug'atni ID orqali olish
    getDictionaryById: build.query<any, string>({
      query: id => ({
        url: `/dictionary/get/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{type: 'Dictionary', id}],
    }),

    // PUT: Lug'atni yangilash
    updateDictionary: build.mutation<any, {id: string; data: any}>({
      query: ({id, data}) => ({
        url: `/dictionary/update/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Dictionary'],
    }),

    // DELETE: Lug'atni o‘chirish
    deleteDictionary: build.mutation<any, string>({
      query: id => ({
        url: `/dictionary/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Dictionary'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useAddDictionaryMutation,
  useGetDictionariesQuery,
  useLazyGetDictionariesQuery,
  useGetDictionaryByIdQuery,
  useUpdateDictionaryMutation,
  useDeleteDictionaryMutation,
} = dictionaryApi
