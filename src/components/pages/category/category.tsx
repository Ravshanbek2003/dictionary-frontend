import {Button} from '@/components/ui/button'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table'
import {useEffect, useState} from 'react'
import {Input} from '@/components/ui/input'
import {useLazyGetCategoryQuery} from '@/app/api/category/category'
import {AddCategory} from './addCategory'
import {Badge} from '@/components/ui/badge'

export const CategoryPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [search, setSearch] = useState<string>('')

  const [dictionaryId, setDictionaryId] = useState<string>('')
  const [getCategory, {data} = {}] = useLazyGetCategoryQuery()
  useEffect(() => {
    getCategory({
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
          <Input
            onChange={e => setSearch(e.target.value)}
            placeholder="Kategoriyani qidirish"
            className="my-4 w-[300px]"
          />
        </div>
        <Table className="w-full table-auto border">
          <TableHeader className="min-w-full">
            <TableRow>
              <TableHead className="w-[10px]">T/R</TableHead>
              <TableHead className="w-1/4">Nomi</TableHead>
              <TableHead className="w-1/4">Bo'lim</TableHead>
              <TableHead className="w-1/4">Tegishli lug'at nomi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="min-w-full">
            {(data?.length as any) &&
              (data as any).map((item: any, index: number) => (
                <TableRow>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.department.title}</TableCell>
                  <TableCell>
                    {item.dictionary.title}{' '}
                    <Badge variant="secondary" className="p-0 px-0.5">
                      {item?.dictionary?.type === 'MODERN' ? 'zamonaviy' : 'tarixiy'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      <AddCategory isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} dictionaryId={dictionaryId} />
    </>
  )
}
