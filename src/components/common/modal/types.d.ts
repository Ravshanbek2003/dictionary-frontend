import {ReactNode} from 'react'

export interface Props {
  title?: string
  className?: string
  children: ReactNode
  openedElement?: ReactNode
  onClick?: () => void
  footerChildren?: ReactNode
  open?: boolean
  close?: Dispatch<SetStateAction<boolean>>
  footerVisible?: boolean
  visibleIcon?: boolean
  visibleScroll?: boolean
}
