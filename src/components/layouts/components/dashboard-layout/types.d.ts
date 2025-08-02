import {ReactNode} from 'react'

export interface Props {
  children: ReactNode
  className?: string
}

export interface NavItemProps {
  to: string
  icon: ReactNode
  text: string
}
