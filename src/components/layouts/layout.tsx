import {useLocation} from 'react-router-dom'
import {Props} from './types'
import {DashboardLayout} from './components'
import {Wrapper} from './components/wrapper'
import {DashboardLayoutRoute} from '@/constants/dashboard-layout-route'

export const Layout: React.FC<Props> = ({children}) => {
  const location = useLocation()

  if (Object.values(DashboardLayoutRoute).includes(location.pathname as DashboardLayoutRoute)) {
    return (
      <Wrapper>
        <DashboardLayout>{children}</DashboardLayout>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <div className="pt-[84px]">{children}</div>
    </Wrapper>
  )
}
