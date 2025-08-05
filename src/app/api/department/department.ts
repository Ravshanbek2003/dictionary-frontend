import {baseApi} from '../baseApi'

export const departmentApi = baseApi.injectEndpoints({
  endpoints: build => ({
    // POST: Lug'at qo‘shish
    addDepartment: build.mutation<any, any>({
      query: formData => ({
        url: '/department/add',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Department'],
    }),
    getDepartments: build.query<any[], {search?: string; dictype?: string}>({
      query: ({search, dictype}) => {
        const params = new URLSearchParams()

        if (search) {
          params.append('search', search)
        }

        if (dictype) {
          params.append('dictype', dictype)
        }

        return {
          url: `/department/get-all?${params.toString()}`,
          method: 'GET',
        }
      },
      providesTags: ['Department'],
    }),

    // GET: Bitta lug'atni ID orqali olish
    getDepartmentById: build.query<any, string>({
      query: id => ({
        url: `/department/get/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{type: 'Department', id}],
    }),

    // PUT: Lug'atni yangilash
    updateDepartment: build.mutation<any, {id: string; data: any}>({
      query: ({id, data}) => ({
        url: `/department/update/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Department'],
    }),

    // DELETE: Lug'atni o‘chirish
    deleteDepartment: build.mutation<any, string>({
      query: id => ({
        url: `/department/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Department'],
    }),
  }),
})

export const {
  useAddDepartmentMutation,
  useGetDepartmentsQuery,
  useLazyGetDepartmentsQuery,
  useGetDepartmentByIdQuery,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentApi
