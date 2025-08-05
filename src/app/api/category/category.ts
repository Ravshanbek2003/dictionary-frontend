import {baseApi} from '../baseApi'

export const categoryApi = baseApi.injectEndpoints({
  endpoints: build => ({
    addCategory: build.mutation<any, any>({
      query: formData => ({
        url: '/category/add',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Category'],
    }),
    getCategory: build.query<any[], {search?: string; department?: string}>({
      query: ({search, department}) => {
        const params = new URLSearchParams()

        if (search) {
          params.append('search', search)
        }

        if (department) {
          params.append('department', department)
        }

        return {
          url: `/category/get-all?${params.toString()}`,
          method: 'GET',
        }
      },
      providesTags: ['Category'],
    }),

    getCategoryById: build.query<any, string>({
      query: id => ({
        url: `/category/get/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{type: 'Category', id}],
    }),

    updateCategory: build.mutation<any, {id: string; data: any}>({
      query: ({id, data}) => ({
        url: `/category/update/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Category'],
    }),

    deleteCategory: build.mutation<any, string>({
      query: id => ({
        url: `/category/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
    }),
  }),
})

export const {
  useAddCategoryMutation,
  useGetCategoryQuery,
  useLazyGetCategoryQuery,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi
