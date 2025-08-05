import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {Modal} from '@/components/common'
import {useHandleRequest} from '@/hooks'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import * as z from 'zod'
import {Button} from '@/components/ui/button'
import {useEffect} from 'react'
import {useLazyGetDictionariesQuery} from '@/app/api/dictionary/dictionary'
import {toast} from 'react-toastify'
import {useLazyGetDepartmentsQuery} from '@/app/api/department/department'
import {useAddWordMutation, useGetWordByIdQuery, useUpdateWordMutation} from '@/app/api/word/word'
import {useLazyGetCategoryQuery} from '@/app/api/category/category'
import {Badge} from '@/components/ui/badge'

const formSchema = z.object({
  title: z.string().min(1, 'Kategoriya nomi majburiy'),
  dictionary: z.string().min(1, "Lug'at nomi majburiy"),
  department: z.string().min(1, "Bo'lim nomi majburiy"),
  category: z.string().min(1, 'Categoriya nomi majburiy'),
  // image: z.any().optional(),
})
export const AddWord = ({
  isModalOpen,
  setIsModalOpen,
  dictionaryId,
}: {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  dictionaryId?: string | undefined
}) => {
  const [addWord] = useAddWordMutation()
  const [updateWord] = useUpdateWordMutation()

  const [getDictionaries, {data: dictionary} = {}] = useLazyGetDictionariesQuery()
  useEffect(() => {
    getDictionaries({})
  }, [])

  const {data} = useGetWordByIdQuery(dictionaryId as any, {
    skip: !dictionaryId,
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      dictionary: '',
      department: '',
      category: '',
    },
  })

  const [getDepartments, {data: department} = {}] = useLazyGetDepartmentsQuery()
  useEffect(() => {
    if (form.watch('dictionary')) {
      getDepartments({
        dictype: form.watch('dictionary'),
      })
    }
  }, [form.watch('dictionary')])

  const [getCategory, {data: category} = {}] = useLazyGetCategoryQuery()
  useEffect(() => {
    if (form.watch('department').length) {
      getCategory({
        department: form.watch('department'),
      })
    }
  }, [form.watch('department')])

  const handleRequest = useHandleRequest()
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (dictionaryId) {
      handleRequest({
        request: async () => {
          const result = await updateWord({
            id: dictionaryId,
            data: {
              title: values.title,
              dictionary: values.dictionary,
              department: values.department,
              category: values.category,
            },
          })
          return result
        },
        onSuccess: () => {
          setIsModalOpen(false)
          form.reset()
          toast.success("So'z muvaffaqiyatli tahrirlandi")
        },
      })
    } else {
      handleRequest({
        request: async () => {
          const result = await addWord({
            title: values.title,
            dictionary: values.dictionary,
            department: values.department,
            category: values.category,
          })
          return result
        },
        onSuccess: () => {
          setIsModalOpen(false)
          form.reset()
          toast.success("So'z muvaffaqiyatli qo'shildi")
        },
      })
    }
  }
  useEffect(() => {
    if (dictionaryId && data) {
      form.setValue('title', data.title)
      form.setValue('dictionary', data.dictionary._id || '')
      form.setValue('department', data.department._id || '')
      form.setValue('category', data.category._id || '')
    }
  }, [dictionaryId, data])

  return (
    <Modal
      title="So'z qo'shish"
      footerChildren={
        <div>
          <Button>Save</Button>
        </div>
      }
      open={isModalOpen}
      close={setIsModalOpen}
    >
      <div className="w-[400px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Type (radio) */}

            {/* Name */}
            <FormField
              control={form.control}
              name="title"
              render={({field}) => (
                <FormItem>
                  <FormLabel>So'z</FormLabel>
                  <FormControl>
                    <Input placeholder="Misol: olma" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* dictionary */}
            <FormField
              control={form.control}
              name="dictionary"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Tegishli lug'at</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Lug'atni tanlang" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {dictionary?.map(item => (
                          <SelectItem key={item._id} value={item._id}>
                            {item?.title}
                            <Badge variant="secondary" className="p-0 px-0.5">
                              {item?.dictionary?.type === 'MODERN' ? 'zamonaviy' : 'tarixiy'}
                            </Badge>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* department */}
            {form.watch('dictionary') && (
              <FormField
                control={form.control}
                name="department"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Lug'atdagi tegishli bo'lim</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Bo'limni tanlang" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {department?.map(item => (
                            <SelectItem key={item._id} value={item._id}>
                              {item.title}
                            </SelectItem>
                          ))}
                          {department?.length === 0 && (
                            <div className="px-4 py-2 text-muted-foreground text-sm">Bo'lim mavjud emas</div>
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {form.watch('department') && (
              <FormField
                control={form.control}
                name="category"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Kategoriya</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Kategoriyani tanlang" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {category?.map(item => (
                            <SelectItem key={item._id} value={item._id}>
                              {item.title}
                            </SelectItem>
                          ))}
                          {category?.length === 0 && (
                            <div className="px-4 py-2 text-muted-foreground text-sm">Kategoriya mavjud emas</div>
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Image */}
            {/* <FormField
                    control={form.control}
                    name="image"
                    render={({field: {onChange, ...rest}}) => (
                      <FormItem>
                        <FormLabel>Rasm (ixtiyoriy)</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={e => {
                              const file = e.target.files?.[0]
                              if (file) {
                                setFileName(file.name)
                                onChange(file)
                              }
                            }}
                            {...rest}
                          />
                        </FormControl>
                        {fileName && <Formdictionary>{fileName}</Formdictionary>}
                      </FormItem>
                    )}
                  /> */}

            {/* Submit buttons */}
            <div className="flex gap-2">
              <Button type="submit">Saqlash</Button>
              <Button type="button" onClick={() => setIsModalOpen(false)} variant="outline">
                Bekor qilish
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  )
}
