import {cn} from '@/lib/utils'
import {Props} from './types'

export const Wrapper = ({children, className}: Props) => (
  <div className={cn('mx-auto min-w-[320px] h-full', className)}>{children}</div>
)
