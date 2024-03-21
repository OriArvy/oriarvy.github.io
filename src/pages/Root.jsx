import { Outlet } from "react-router-dom"
import MainNavigator from '../components/MainNavigation'

function RootLayout() {
  return (
    <>
      <MainNavigator />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default RootLayout
