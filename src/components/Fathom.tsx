import React from 'react'

declare global {
  interface Window { fathom: any; }
}

function Fathom (props) {
  React.useEffect(() => {
    const script = document.createElement('script')
    script.async = true
    script.id = 'fathom-script'
    script.src = 'https://fathom.k8s.menubar.io/tracker.js'
    window.fathom = window.fathom || function () {
      (window.fathom.q = window.fathom.q || []).push(arguments)
    }
    const ref = document.getElementsByTagName('script')[0]
    ref.parentNode.insertBefore(script, ref)
    window.fathom('set', 'siteId', 'CIGXT')
    window.fathom('trackPageview')
  }, [])

  return null
} 

export default Fathom