import RouteChangeListener from '../components/RouteChangeListener'
import RootLayout from './Root'

function RootLayoutWithListener() {
  return (
    <>
      <RouteChangeListener />
      <RootLayout />
    </>
  )
}

export default RootLayoutWithListener
