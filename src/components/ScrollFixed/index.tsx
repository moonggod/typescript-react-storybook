import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { v4 as uuidv4 } from 'uuid'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(0),
      padding: theme.spacing(0),
    }
  })
)

let scrollFixedtimer:any=null
export default function ScrollFixed({children,fixedTop}: {children:any, fixedTop?: number}) {
  const classes = useStyles()
  const [needToFixed, setNeedToFixed] = React.useState(false)
  const [id] = React.useState<string>(`id_${uuidv4()}`)
  const [domProperty, setDomProperty] = React.useState<any>({})
  const [fixedStyle, setFixedStyle] = React.useState<any>({})
  const [keyScrollPos, setKeyScrollPos] = React.useState<number>(0)
  const [init, setInit] = React.useState(true)

  React.useEffect(() => {
    if (init) {
      setInit(false)
      const scrollDom = document.getElementById(id) as HTMLElement
      const contentDom = scrollDom.childNodes[0] as HTMLElement
      const boundingClientRect = contentDom.getBoundingClientRect()
      const _domProperty = {
        width: contentDom.offsetWidth,
        height: contentDom.offsetHeight,
        top: domProperty.top || boundingClientRect.top,
        left: boundingClientRect.left
      }
      const _keyScrollPos = _domProperty.top - (fixedTop||0)
      setFixedStyle({
        position: 'fixed',
        width: `${_domProperty.width}px`,
        height: `${_domProperty.height}px`,
        top: `${fixedTop||0}px`,
        left: `${_domProperty.left}px`
      })
      setKeyScrollPos(_keyScrollPos)
      setDomProperty(_domProperty)
      setNeedToFixed(window.scrollY > _keyScrollPos)
    }
  }, [domProperty, fixedTop, id, init])

  React.useEffect(() => {
    const handleResize = () => {
      setNeedToFixed(false)
      clearTimeout(scrollFixedtimer)
      scrollFixedtimer = setTimeout(() => setInit(true), 200)
    }
    const checkNeedToFixed = () => {
      setNeedToFixed(window.scrollY > keyScrollPos)
    }
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', checkNeedToFixed)
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', checkNeedToFixed)
    }
  }, [keyScrollPos])

  return (
    <div id={id} className={classes.root} style={needToFixed?fixedStyle:{}}>
      {children}
    </div>
  )
}
