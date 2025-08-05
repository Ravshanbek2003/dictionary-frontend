import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {Modal} from '@/components/common'
import {useHandleRequest} from '@/hooks'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import * as z from 'zod'
import {Button} from '@/components/ui/button'

import {toast} from 'react-toastify'
import {useAddCategoryMutation} from '@/app/api/category/category'

const formSchema = z.object({
  title: z.string().min(1, "Bo'lim nomi majburiy"),
  // image: z.any().optional(),
})
export const AddCategoryFromDepartment = ({
  isModalOpen,
  setIsModalOpen,
  ids,
}: {
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  ids: any
}) => {
  const [addCategory] = useAddCategoryMutation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  })

  const handleRequest = useHandleRequest()
  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    handleRequest({
      request: async () => {
        const result = await addCategory({
          title: values.title,
          dictionary: ids.dictionaryId,
          department: ids.departmentId,
        })
        return result
      },
      onSuccess: () => {
        setIsModalOpen(false)
        form.reset()
        toast.success("Kategoriya muvaffaqiyatli qo'shildi")
      },
    })
  }

  return (
    <Modal
      title="Kategoriya qo'shish"
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
