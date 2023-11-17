import React from 'react'

interface Props{
    className:string,
    children:React.ReactNode
}

const Card: React.FC<Props> = ({className,children}) => {
  return (
    <article className={`card ${className}`}>
       {children}
    </article>
  )
}

export default Card