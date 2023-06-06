import React, { useState } from 'react'

// components
import SignIn from './SignIn'
import SignUp from './SignUp'

const Auth = ({ routeChange, setRouteChange }) => {
  const [activeView, setActiveView] = useState('signin')
  return (
    <>
      {activeView === 'signup' && (
        <div className='w-full flex flex-col'>
          <SignUp
            viewHandler={() => setActiveView('signin')}
            routeChange={routeChange}
            setRouteChange={setRouteChange}
          />
        </div>
      )}
      {activeView === 'signin' && (
        <div className='w-full flex flex-col'>
          <SignIn
            viewHandler={() => setActiveView('signup')}
            routeChange={routeChange}
            setRouteChange={setRouteChange}
          />
        </div>
      )}
    </>
  )
}

export default Auth
