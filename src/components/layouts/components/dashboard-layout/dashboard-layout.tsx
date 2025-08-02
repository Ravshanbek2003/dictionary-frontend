import {cn} from '@/lib/utils'
import {CreditsIcon, DashboardIcon, MentorsIcon, StudentsIcon} from '@/icons'
import {NavItem} from './components/nav-item'
import {Props} from './types'
import {FiLogOut} from 'react-icons/fi'

export const DashboardLayout = ({children, className}: Props) => (
  <div className={cn('flex flex-col pb-[70px] pt-[68px]', className)}>
    <div className="flex items-center justify-between py-[2px] fixed top-0 left-0 z-50 bg-primary-100 w-full border-b border-grey-light-400"></div>
    <div className="flex-grow h-full fixed top-[68px] left-[276px]">{children}</div>
    <div className="flex flex-col items-start justify-start gap-1 py-[30px] max-w-[256px] fixed top-0 left-0 h-full bg-primary-100 px-[10px] border-r border-grey-light-400">
      <div className="flex items-center justify-center mx-auto">
        <img src="/images/main-logo.png" alt="" className="rounded-full w-[160px]" />
      </div>
      <NavItem to="/" icon={<DashboardIcon className="w-6 h-6" />} text="Lug'at" />
      <NavItem to="/mentors" icon={<MentorsIcon className="w-6 h-6" />} text="Bo'limlar" />
      <NavItem to="/students" icon={<StudentsIcon className="w-6 h-6" />} text="Kategoriyalar" />
      <NavItem to="/credits" icon={<CreditsIcon className="w-6 h-6" />} text="So'zlar" />
      <div className="mx-auto mt-4">
        <button
          // onClick={handleLogout}
          className="
        flex items-center space-x-2 // Ikonka va matnni yonma-yon qo'yish
        bg-red-500 hover:bg-red-600 
        text-white font-bold 
        py-2 px-4 rounded-full
        shadow-lg hover:shadow-xl
        transition duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75
      "
        >
          <FiLogOut className="text-xl" /> 
          <span>Tizimdan chiqish</span>  
        </button>
      </div>
    </div>
  </div>
)
