import React from 'react'
import Spinner from 'shared/Spinner'

const Button = ({ type, title, handleClick, loading }) => {
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <button
          type={type}
          className='w-full bg-green-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
          onClick={handleClick}
        >
          {title}
        </button>
      )}
    </>
  )
}

export default Button
