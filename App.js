import { useState } from 'react'
import logo from './logo.svg'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  // useNavigate,
  Link,
} from 'react-router-dom'

// Screens
import Auth from 'screens/auth/Auth'
import HomeScreen from 'screens/home/HomeScreen'
import ProfileScreen from 'screens/proflle/ProfileScreen'

// components
import NavBar from 'shared/navbar/NavBar'
function App() {
  const [routeChange, setRouteChange] = useState(false)
  let routes

  let token = false
  const storedData = JSON.parse(localStorage.getItem('userData'))
  if (storedData) {
    token = true
  }

  // const userState = useSelector((state) => state.auth)
  // const dispatch = useDispatch()
  // const token = userState?.user?.token
  // // const navigate = useNavigate()

  // useEffect(() => {
  //   const storedData = JSON.parse(localStorage.getItem('userData'))
  //   if (
  //     storedData
  //     // && storedData.token
  //     // new Date(storedData.expiration) > new Date()
  //   ) {
  //     const user = {
  //       ...storedData,
  //       // expiration: tokenExpirationDate.toISOString(),
  //     }
  //     // setting the user in redux and local storage
  //     dispatch(authActions.setUserInfo(user))
  //   } else {
  //     // means user was logged in but its expiration data is over
  //     //so navigating the user back to login screen (by logging out)
  //     authActions.logout()
  //     // navigate('/auth')
  //   }
  //   // This will be called only once i.e. on the first render of app
  // }, [])

  routes = !token ? (
    <Routes>
      <Route
        path='/'
        element={
          <Auth routeChange={routeChange} setRouteChange={setRouteChange} />
        }
      ></Route>
      <Route
        path='/auth'
        element={
          <Auth routeChange={routeChange} setRouteChange={setRouteChange} />
        }
      ></Route>
      <Route path='/*' element={<Navigate to='/' />}></Route>
    </Routes>
  ) : (
    <Routes>
      <Route path='/' element={<HomeScreen />}></Route>
      <Route path='/home' element={<HomeScreen />}></Route>
      <Route path='/profile' element={<ProfileScreen />}></Route>
      <Route path='/*' element={<Navigate to='/' />}></Route>
    </Routes>
  )

  return (
    // <p className='text-3xl font-bold underline bg-red-500'>Hello world!</p>
    <Router basename='/'>
      <div className='max-w-[1600px] relative overflow-hidden m-auto flex flex-col self-center font-normal font-poppins text-[#333333]'>
        <NavBar
          token={token}
          routeChange={routeChange}
          setRouteChange={setRouteChange}
        />
        <div className='flex'>{routes}</div>
      </div>
    </Router>
  )
}

export default App
