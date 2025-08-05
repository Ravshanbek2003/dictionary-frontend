import {Button} from '@/components/ui/button'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table'
import {useEffect, useState} from 'react'

import {Badge} from '@/components/ui/badge'
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
import {AddWord} from './addWord'
import {useDeleteWordMutation, useLazyGetWordQuery, wordApi} from '@/app/api/word/word'

export const WordPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [search, setSearch] = useState<string>('')

  const [dictionaryId, setDictionaryId] = useState<string>('')
  const dispatch = useDispatch()

  // const [fileName, setFileName] = useState<string>('')
  const [getWord, {data} = {}] = useLazyGetWordQuery()
  const [deleteWord] = useDeleteWordMutation()
  useEffect(() => {
    getWord({
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
        <div className="flex items-center gap-2">
          <Input onChange={e => setSearch(e.target.value)} placeholder="So'zni qidirish" className="my-4 w-[300px]" />
        </div>
        <Table className="w-full table-auto border">
          <TableHeader className="min-w-full">
            <TableRow>
              <TableHead className="w-[10px]">T/R</TableHead>
              <TableHead className="w-1/4">Nomi</TableHead>
              <TableHead className="w-1/4">Kategoriya</TableHead>
              <TableHead className="w-1/4">Bo'lim</TableHead>
              <TableHead className="w-1/4">Tegishli lug'at nomi</TableHead>
              <TableHead className="w-[10px] text-center">Yana</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="min-w-full">
            {(data?.length as any) &&
              (data as any).map((item: any, index: number) => (
                <TableRow>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.category.title}</TableCell>
                  <TableCell>{item.department.title}</TableCell>
                  <TableCell>
                    {item.dictionary.title}{' '}
                    <Badge variant="secondary" className="p-0 px-0.5">
                      {item.dictionary.type === 'MODERN' ? 'zamonaviy' : 'tarixiy'}
                    </Badge>
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
                            await deleteWord(item._id)
                            toast.success("Bo'lim o'chirildi")
                            dispatch(wordApi.util.invalidateTags(['Word']))
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

      <AddWord isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} dictionaryId={dictionaryId} />
    </>
  )
}
