exports.onRouteUpdate = ({ location }) => {
  console.log(location)
  if (window.fathom) {
    window.fathom('trackPageview', { url: location.href })
  }
}
