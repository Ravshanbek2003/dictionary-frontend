import {cn} from '@/lib/utils'
import {Props} from './types'

export const Wrapper = ({children, className}: Props) => (
  <div className={cn('max-w-[1440px] mx-auto min-w-[320px]', className)}>{children}</div>
)
