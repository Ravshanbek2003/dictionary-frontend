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
import {
  useAddDepartmentMutation,
  useGetDepartmentByIdQuery,
  useUpdateDepartmentMutation,
} from '@/app/api/department/department'
import {useLazyGetDictionariesQuery} from '@/app/api/dictionary/dictionary'
import {toast} from 'react-toastify'
import {Badge} from '@/components/ui/badge'

const formSchema = z.object({
  title: z.string().min(1, "Bo'lim nomi majburiy"),
  dictionary: z.string().min(1, "Lug'at nomi majburiy"),
  // image: z.any().optional(),
})
export const AddDepartment = ({
  isModalOpen,
  setIsModalOpen,
  dictionaryId,
}: {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  dictionaryId?: string | undefined
}) => {
  const [addDepartment] = useAddDepartmentMutation()
  const [updateDepartment] = useUpdateDepartmentMutation()

  const [getDictionaries, {data: dictionary} = {}] = useLazyGetDictionariesQuery()
  useEffect(() => {
    getDictionaries({})
  }, [])
  const {data} = useGetDepartmentByIdQuery(dictionaryId as any, {
    skip: !dictionaryId,
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      dictionary: '',
    },
  })

  const handleRequest = useHandleRequest()
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (dictionaryId) {
      handleRequest({
        request: async () => {
          const result = await updateDepartment({
            id: dictionaryId,
            data: {
              title: values.title,
              dictionary: values.dictionary,
            },
          })
          return result
        },
        onSuccess: () => {
          setIsModalOpen(false)
          form.reset()
          toast.success("Bo'lim muvaffaqiyatli tahrirlandi")
        },
      })
    } else {
      handleRequest({
        request: async () => {
          const result = await addDepartment({
            title: values.title,
            dictionary: values.dictionary,
          })
          return result
        },
        onSuccess: () => {
          setIsModalOpen(false)
          form.reset()
          toast.success("Bo'lim muvaffaqiyatli qo'shildi")
        },
      })
    }
  }
  useEffect(() => {
    if (dictionaryId && data) {
      form.setValue('title', data.title)
      form.setValue('dictionary', data.dictionary._id || '')
    }
  }, [dictionaryId, data])

  return (
    <Modal
      title="Bo'lim qo'shish"
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
                  <FormLabel>Bo'lim nomi</FormLabel>
                  <FormControl>
                    <Input placeholder="Misol: Bo'lim" {...field} />
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
                  <FormLabel>Lug'atni tanlang</FormLabel>
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
                            {item.title}{' '}
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
