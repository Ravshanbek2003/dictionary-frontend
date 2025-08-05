import {useLoginMutation} from '@/app/api'
import {Button} from '@/components/ui/button'
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from '@/components/ui/command'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'
import {COUNTRIES} from '@/constants/countries'
import {useHandleRequest} from '@/hooks'
import {useStorage} from '@/utils'
import {useState} from 'react'

type Status = {
  name: string
  shortName: string
  code: string
}

export const LoginPage = () => {
  const [open, setOpen] = useState(false)
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const [selectedStatus, setSelectedStatus] = useState<Status | null>({
    name: 'Uzbekistan',
    shortName: 'uz',
    code: '+998',
  })
  const [login] = useLoginMutation({})

  const handleRequest = useHandleRequest()
  const onSubmit = async () => {
    await handleRequest({
      request: async () => {
        const result = await login({
          phone: selectedStatus?.code + phone,
          password: password,
        }).unwrap()
        return result
      },
      onSuccess: (loginData: any) => {

        useStorage.setCredentials({
          token: loginData?.token,
        })
        window.location.href = '/'
      },
    })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Kirish</h2>
        <p className="text-sm text-gray-500 mb-4">Tizimga kirish uchun login va parolni kiriting</p>

        <label className="block text-sm font-medium text-gray-700 mb-1">Login</label>
        <div className="flex items-center border rounded-lg overflow-hidden mb-4">
          <div className="flex items-center">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild className="p-0 rounded-tr-none rounded-br-none border-none ">
                <Button variant="outline" className="w-[40px]">
                  {selectedStatus ? (
                    <img
                      src={'https://flagcdn.com/' + selectedStatus.shortName + '.svg'}
                      className="w-[30px] h-[25px]"
                    />
                  ) : (
                    <div className="w-[30px] h-[25px] bg-black" />
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" side="right" align="start">
                <Command>
                  <CommandInput placeholder="Change country..." />
                  <CommandList>
                    <CommandEmpty>No countries.</CommandEmpty>
                    <CommandGroup>
                      {COUNTRIES.map(status => (
                        <CommandItem
                          key={status.code}
                          value={status.name}
                          onSelect={value => {
                            setSelectedStatus(COUNTRIES.find(priority => priority.name === value) || null)
                            setOpen(false)
                          }}
                        >
                          <div className="flex items-center gap-1">
                            <img
                              src={'https://flagcdn.com/' + status.shortName + '.svg'}
                              className="w-[30px] h-[25px] mr-3"
                            />
                            <p>{status.name}</p>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="90 417 47 56"
            className="w-full px-3 py-2 focus:outline-none text-sm"
          />
        </div>

        <label className="block text-sm font-medium text-gray-700 mb-1">Parol</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-3 py-2 mb-6 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-100 text-sm"
        />

        <button
          disabled={!phone || !password}
          onClick={onSubmit}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition text-sm"
        >
          Kirish
        </button>
      </div>
    </div>
  )
}
