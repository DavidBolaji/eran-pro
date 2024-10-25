import React, { PropsWithChildren } from 'react'

export const Wrapper:React.FC<PropsWithChildren> = ({children}) => {
  return (
    <div className='h-full max-w-[1130px] mx-auto'>{children}</div>
  )
}
