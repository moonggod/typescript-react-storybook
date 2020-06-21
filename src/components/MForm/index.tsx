import React, { FunctionComponent } from 'react'

type FormProps = {
  title?: string
}
export const MForm: FunctionComponent<FormProps> = ({title}) => {
  return (
    <div>{title}</div>
  )
}