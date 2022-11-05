import React, { Fragment, useEffect } from 'react'
import { useLocation } from 'react-router'

function ScrollToTop({children}) {
  const { pathname } = useLocation()
  
  useEffect(() => {
    window.scrollTo(0,0);
  }, [pathname])

  return (
    <Fragment>{children}</Fragment>
  )
}

export default ScrollToTop