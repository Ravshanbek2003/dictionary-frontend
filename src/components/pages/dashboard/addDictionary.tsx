import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group'
import {Modal} from '@/components/common'
import {useHandleRequest} from '@/hooks'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  useAddDictionaryMutation,
  useGetDictionaryByIdQuery,
  useUpdateDictionaryMutation,
} from '@/app/api/dictionary/dictionary'
import {Button} from '@/components/ui/button'
import {useEffect} from 'react'
import { toast } from 'react-toastify'

const formSchema = z.object({
  type: z.enum(['HISTORICAL', 'MODERN']),
  title: z.string().min(1, "Lug'at nomi majburiy"),
  description: z.string().optional(),
  // image: z.any().optional(),
})
export const AddDictionary = ({
  isModalOpen,
  setIsModalOpen,
  dictionaryId,
}: {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  dictionaryId?: string | undefined
}) => {
  const [addDictionary] = useAddDictionaryMutation()
  const [updateDictionary] = useUpdateDictionaryMutation()

  const {data} = useGetDictionaryByIdQuery(dictionaryId as any, {
    skip: !dictionaryId,
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'MODERN',
      title: '',
      description: '',
    },
  })

  const handleRequest = useHandleRequest()
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (dictionaryId) {
      handleRequest({
        request: async () => {
          const result = await updateDictionary({
            id: dictionaryId,
            data: {
              type: values.type as 'MODERN' | 'HISTORICAL',
              title: values.title,
              description: values.description,
            },
          })
          return result
        },
        onSuccess: () => {
          setIsModalOpen(false)
          form.reset()
          toast.success('Lug\'at muvaffaqiyatli tahrirlandi')
        },
      })
    } else {
      handleRequest({
        request: async () => {
          const result = await addDictionary({
            type: values.type as string,
            title: values.title,
            description: values.description,
          })
          return result
        },
        onSuccess: () => {
          setIsModalOpen(false)
          form.reset()
          
          toast.success('Lug\'at muvaffaqiyatli qo\'shildi')
        },
      })
    }
  }

  useEffect(() => {
    if (dictionaryId && data) {
      form.setValue('type', data.type)
      form.setValue('title', data.title)
      form.setValue('description', data.description || '')
    }
  }, [dictionaryId, data])

  return (
    <Modal
      title="Lug'at qo'shish"
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
            <FormField
              control={form.control}
              name="type"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Qo'shmoqchi bo'lgan lug'at turini tanlang</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-2"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="HISTORICAL" />
                        </FormControl>
                        <FormLabel className="font-normal">Tarixiy lug'at</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="MODERN" />
                        </FormControl>
                        <FormLabel className="font-normal">Zamonaviy lug'at</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Name */}
            <FormField
              control={form.control}
              name="title"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Lug'at nomi</FormLabel>
                  <FormControl>
                    <Input placeholder="Misol: O'z lug'at" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Tavsif (ixtiyoriy)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tavsif yozing..." {...field} />
                  </FormControl>
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
                        {fileName && <FormDescription>{fileName}</FormDescription>}
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
