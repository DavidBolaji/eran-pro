import React, { PropsWithChildren } from 'react'

export const Wrapper:React.FC<PropsWithChildren> = ({children}) => {
  return (
    <div className='h-full max-w-[1200px] mx-auto'>{children}</div>
  )
}
