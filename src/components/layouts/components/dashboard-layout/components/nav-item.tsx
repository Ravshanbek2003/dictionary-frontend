import React from 'react'
import {NavLink} from 'react-router-dom'
import {NavItemProps} from '../types'
import {cn} from '@/lib/utils'

export const NavItem: React.FC<NavItemProps> = ({to, icon, text}) => (
  <NavLink
    to={to}
    className={({isActive}) =>
      cn(
        'bg-primary-100 w-[236px] border border-primary-100 flex justify-start items-center gap-3 font-medium font-quicksand rounded-[8px] py-4 px-5',
        isActive ? 'text-primary-600 border-primary-600 bg-primary-200' : 'text-grey-light-500',
      )
    }
  >
    {location.pathname === to ? (
      <>
        <span className="text-primary-600">{icon}</span>
        <span className="font-fredoka text-18 font-semibold leading-26">{text}</span>
      </>
    ) : (
      <>
        <span className="text-grey-dark-500">{icon}</span>
        <span className="font-fredoka text-18 font-semibold leading-26 text-grey-dark-500">{text}</span>
      </>
    )}
  </NavLink>
)
