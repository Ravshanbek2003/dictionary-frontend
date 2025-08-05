import {Button} from '@/components/ui/button'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {useEffect, useState} from 'react'
import {AddDictionary} from './addDictionary'
import {dictionaryApi, useDeleteDictionaryMutation, useLazyGetDictionariesQuery} from '@/app/api/dictionary/dictionary'
import {Input} from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {BsThreeDots} from 'react-icons/bs'
import {toast} from 'react-toastify'
import {useDispatch} from 'react-redux'
import {Badge} from '@/components/ui/badge'

export const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [search, setSearch] = useState<string>('')

  const [dictionaryId, setDictionaryId] = useState<string>('')
  const dispatch = useDispatch()

  // const [fileName, setFileName] = useState<string>('')
  const [getDictionaries, {data} = {}] = useLazyGetDictionariesQuery()
  const [deleteDictionary] = useDeleteDictionaryMutation()
  useEffect(() => {
    getDictionaries({
      search: search,
    })
  }, [search])

  return (
    <>
      <div className="pt-[60px] h-[98vh] overflow-y-scroll px-2">
        <div className="flex justify-end">
          <Button
            className="bg-primary-200"
            onClick={() => {
              setDictionaryId('')
              setIsModalOpen(true)
            }}
          >
            + Yangi qo'shish
          </Button>
        </div>
        <Input onChange={e => setSearch(e.target.value)} placeholder="Lug'at qidirish" className="my-4 w-[300px]" />
        <Tabs defaultValue="modern" className="w-full">
          <TabsList>
            <TabsTrigger value="modern">Zamonaviy lug'atlar</TabsTrigger>
            <TabsTrigger value="historical">Tarixiy lug'atlar</TabsTrigger>
          </TabsList>
          <TabsContent value="modern">
            <Table className="w-full table-auto border">
              <TableHeader className="min-w-full">
                <TableRow>
                  <TableHead className="w-[10px]">T/R</TableHead>
                  <TableHead className="w-1/2">Nomi</TableHead>
                  <TableHead className="w-1/2">Rasm</TableHead>
                  <TableHead className="w-[10px] text-center">Yana</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="min-w-full">
                {(data?.length as any) &&
                  data
                    ?.filter((item: any) => item.type === 'MODERN')
                    .map((item, index) => (
                      <TableRow>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>
                          {item.title}{' '}
                          <Badge variant="secondary" className="p-0 px-0.5">
                            {item?.dictionary?.type === 'MODERN' ? 'zamonaviy' : 'tarixiy'}
                          </Badge>
                        </TableCell>
                        <TableCell>{'Rasm mavjud emas'}</TableCell>
                        <TableCell className="text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button>
                                <BsThreeDots />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="start">
                              <DropdownMenuItem
                                className="text-green-600"
                                onClick={() => {
                                  setDictionaryId(item._id)
                                  setIsModalOpen(true)
                                }}
                              >
                                Tahrirlash
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={async () => {
                                  await deleteDictionary(item._id)
                                  toast.success("Lug'at o'chirildi")
                                  dispatch(dictionaryApi.util.invalidateTags(['Dictionary']))
                                }}
                              >
                                O'chirish
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="historical">
            <Table className="w-full table-auto border">
              <TableHeader className="min-w-full">
                <TableRow>
                  <TableHead className="w-[10px]">T/R</TableHead>
                  <TableHead className="w-1/2">Nomi</TableHead>
                  <TableHead className="w-1/2">Rasm</TableHead>
                  <TableHead className="w-[10px] text-center">Yana</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="min-w-full">
                {(data?.length as any) &&
                  data
                    ?.filter((item: any) => item.type === 'HISTORICAL')
                    .map((item, index) => (
                      <TableRow>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{'Rasm mavjud emas'}</TableCell>
                        <TableCell className="text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button>
                                <BsThreeDots />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="start">
                              <DropdownMenuItem
                                className="text-green-600"
                                onClick={() => {
                                  setDictionaryId(item._id)
                                  setIsModalOpen(true)
                                }}
                              >
                                Tahrirlash
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={async () => {
                                  await deleteDictionary(item._id)
                                  toast.success("Lug'at o'chirildi")
                                  dispatch(dictionaryApi.util.invalidateTags(['Dictionary']))
                                }}
                              >
                                O'chirish
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>

      <AddDictionary isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} dictionaryId={dictionaryId} />
    </>
  )
}
