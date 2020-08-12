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

let timer
let scrollDom
export default function ScrollFixed({children,keyPos}: {children:any, keyPos?: number}) {
  const classes = useStyles()
  const [needToFixed, setNeedToFixed] = React.useState(false)
  const [id] = React.useState<string>(`id_${uuidv4()}`)
  const [domProperty, setDomProperty] = React.useState<any>({})
  const [fixedStyle, setFixedStyle] = React.useState<any>({})
  const [keyScrollPos, setKeyScrollPos] = React.useState<number>(0)

  React.useEffect(() => {
    setKeyScrollPos(domProperty.top - (keyPos||0))
  }, [domProperty, keyPos])

  React.useEffect(() => {
    getDomProperty()
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    makeFixedStyle()
    // eslint-disable-next-line
  }, [domProperty])

  const makeFixedStyle = () => {
    setFixedStyle({
      position: 'fixed',
      width: `${domProperty.width}px`,
      height: `${domProperty.height}px`,
      top: `${keyPos||0}px`,
      left: `${domProperty.left}px`
    })
  }

  const checkNeedToFixed = () => {
    setNeedToFixed(window.scrollY > keyScrollPos)
  }

  const getDomProperty = () => {
    !scrollDom && (scrollDom = document.getElementById(id))
    if (!scrollDom) return
    const boundingClientRect = scrollDom.childNodes[0].getBoundingClientRect()
    console.log(scrollDom)
    setDomProperty({
      width: scrollDom.childNodes[0].offsetWidth,
      height: scrollDom.childNodes[0].offsetHeight,
      top: domProperty.top || boundingClientRect.top,
      left: boundingClientRect.left
    })
    setTimeout(checkNeedToFixed, 0)
  }

  window.addEventListener('resize', () => {
    setNeedToFixed(false)
    clearTimeout(timer)
    timer = setTimeout(getDomProperty, 100)
  })
  window.addEventListener('scroll', checkNeedToFixed)

  return (
    <div id={id} className={classes.root} style={needToFixed?fixedStyle:{}}>
      {children}
    </div>
  )
}
