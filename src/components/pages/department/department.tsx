import {Button} from '@/components/ui/button'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table'
import {useEffect, useState} from 'react'
import {useLazyGetDictionariesQuery} from '@/app/api/dictionary/dictionary'
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
import {AddDepartment} from './addDepartment'
import {departmentApi, useDeleteDepartmentMutation, useLazyGetDepartmentsQuery} from '@/app/api/department/department'
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {AddCategoryFromDepartment} from './addCategoryFromDepartment'
import { Badge } from '@/components/ui/badge'

export const DepartmentPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpen1, setIsModalOpen1] = useState(false)
  const [search, setSearch] = useState<string>('')
  const [query, setQuery] = useState<string>('')
  const [ids, setIds] = useState<{dictionaryId: string; departmentId: string}>({
    dictionaryId: '',
    departmentId: '',
  })
  const [dictionaryId, setDictionaryId] = useState<string>('')
  const dispatch = useDispatch()

  // const [fileName, setFileName] = useState<string>('')
  const [getDepartments, {data} = {}] = useLazyGetDepartmentsQuery()
  const [deleteDepartment] = useDeleteDepartmentMutation()
  useEffect(() => {
    getDepartments({
      search: search,
      dictype: query,
    })
  }, [search, query])
  const [getDictionaries, {data: dictionary} = {}] = useLazyGetDictionariesQuery()
  useEffect(() => {
    getDictionaries({})
  }, [])

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
        <div className="flex items-center gap-2">
          <Select value={query} onValueChange={setQuery}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Lug'atni bo'yichini tanlang" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {dictionary?.map(item => (
                  <SelectItem key={item._id} value={item._id}>
                    {item.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input onChange={e => setSearch(e.target.value)} placeholder="Bo'limni qidirish" className="my-4 w-[300px]" />
        </div>
        <Table className="w-full table-auto border">
          <TableHeader className="min-w-full">
            <TableRow>
              <TableHead className="w-[10px]">T/R</TableHead>
              <TableHead className="w-1/4">Nomi</TableHead>
              <TableHead className="w-1/4">Tegishli lug'at nomi</TableHead>
              <TableHead className="w-1/4">Rasm</TableHead>
              <TableHead className="w-1/4">Kategoriya qo'shish</TableHead>
              <TableHead className="w-[10px] text-center">Yana</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="min-w-full">
            {(data?.length as any) &&
              (data as any).map((item: any, index: number) => (
                <TableRow>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>
                    {item.dictionary.title}{' '}
                    <Badge variant="secondary" className="p-0 px-0.5">
                      {item?.dictionary?.type === 'MODERN' ? 'zamonaviy' : 'tarixiy'}
                    </Badge>
                  </TableCell>
                  <TableCell>{'Rasm mavjud emas'}</TableCell>
                  <TableCell>
                    <Button
                      className="bg-primary-200"
                      onClick={() => {
                        setIsModalOpen1(true)
                        setIds({
                          dictionaryId: item.dictionary._id,
                          departmentId: item._id,
                        })
                      }}
                    >
                      Kategoriya qo'shish
                    </Button>
                  </TableCell>
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
                            await deleteDepartment(item._id)
                            toast.success("Bo'lim o'chirildi")
                            dispatch(departmentApi.util.invalidateTags(['Department']))
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
      </div>

      <AddDepartment isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} dictionaryId={dictionaryId} />

      <AddCategoryFromDepartment isModalOpen={isModalOpen1} setIsModalOpen={setIsModalOpen1} ids={ids} />
    </>
  )
}
