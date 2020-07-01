import React, { FunctionComponent, useState, useEffect } from 'react'

type CutDownProps = {
  opencutdown?: Boolean
  onClose: Function
}

const CutDown: FunctionComponent<CutDownProps> = ({ opencutdown, onClose }) => {
  const [myseconds, setMyseconds] = useState(60)
  useEffect(() => {
    if (opencutdown) {
      setTimeout(() => {
        if (myseconds === 1) {
          onClose()
        } else {
          setMyseconds(myseconds - 1)
        }
      }, 1000)
    } else {
      setMyseconds(60)
    }
  }, [myseconds, opencutdown, onClose])

  return (
    <div>
      <span>{myseconds}</span>
    </div>
  )
}
export default CutDown
