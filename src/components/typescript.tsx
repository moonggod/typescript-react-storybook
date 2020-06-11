import React from 'react'

const group = {
  aaa:4444
}
interface matchInfo {
  params:{
    aaa: 'aaa'
  }
}
export const MForm = ({match}:{match:matchInfo}) => {
  const keyComponent = group[match.params.aaa]
  return (
    <div>
      {keyComponent}
    </div>
  )
}