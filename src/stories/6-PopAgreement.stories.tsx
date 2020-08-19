import React from 'react'
import Provider from '../Provider'
import PopAgreement from '../components/PopAgreement'

export default {
  title: 'PopAgreement'
}

export const _PopAgreement = () => {
  const [open, setOpen] = React.useState(false)
  return (
    <Provider>
      <div>
        <button onClick={() => setOpen(true)}>watch</button>
        <PopAgreement open={open} onClose={() => setOpen(false)} />
      </div>
    </Provider>
  )
}
