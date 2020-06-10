import React, { FunctionComponent } from 'react'

type FormProps = {
  title?: string
}
export const MForm: FunctionComponent<FormProps> = ({title}) => {
  console.log(title)
  return (
    <div>{title}</div>
  )
}