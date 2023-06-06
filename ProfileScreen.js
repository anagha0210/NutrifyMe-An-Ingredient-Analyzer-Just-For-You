import React, { useEffect, useState } from 'react'
import Button from 'screens/auth/components/Button'
import FormInput from 'screens/auth/components/FormInput'
// api integration
import axiosClient from 'apiReq/axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { SelectedIngredients } from 'shared/SelectedIngredient'
const ProfileScreen = () => {
  return (
    <div className='w-full min-h-screen bg-gray-50 flex flex-col lg:flex-row relative'>
      <img src="assets/profileff.jpg" width='100%' className="absolute" />
      <IngredientScreen
        id='favourite'
        title={'Healthy ingredients'}
        subTitle='healthy'
      />
      <IngredientScreen
        id='allergic'
        title={'Allergic ingredients'}
        subTitle='allergic'
      />
    </div>
  )
}

const IngredientScreen = ({ id, title, subTitle }) => {
  const storedData = JSON.parse(localStorage.getItem('userData'))

  const [ingredients, setIngredients] = useState([])

  const [inputIngredient, setInputIngredient] = useState('')
  const addIngredient = () => {
    if (inputIngredient) {
      const tempIngredients = [...ingredients, inputIngredient]
      setIngredients(tempIngredients)
    }
  }
  const handleChange = (index, value) => {
    let tempList = ingredients.map((ingredient, idx) => {
      if (idx === index) {
        return value
      } else return ingredient
    })

    setIngredients(tempList)
  }

  const handleDelete = (index) => {
    let tempList = [...ingredients]

    tempList.splice(index, 1)
    setIngredients([...tempList])
  }

  const submitIngredients = (e) => {
    e.preventDefault()
    console.log('submit Ingredients ', ingredients)
    if (subTitle === 'healthy') {
      axiosClient
        .post('addProfile', {
          userId: storedData?.id,
          ingredients: ingredients,
          type: 'healthy',
        })
        .then((resp) => {
          toast.success('Healthy Ingredients added', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          })
        })
        .catch(() => {
          toast.error('Network Error: please try later', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          })
        })
    } else {
      // make axios request via allergic endpoint
      axiosClient
        .post('addProfile', {
          userId: storedData?.id,
          ingredients: ingredients,
          type: 'allergic',
        })
        .then((resp) => {
          toast.success('Allergic Ingredients added', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          })
        })
        .catch(() => {
          toast.error('Network Error: please try later', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          })
        })
    }
  }

  useEffect(() => {
    axiosClient.get(`profile/${storedData?.id}`).then((resp) => {
      console.log('subtitle is ', subTitle, subTitle === 'healthy')
      let list = []
      if (subTitle === 'healthy') {
        resp?.data?.map((ingredient) => {
          if (ingredient.type == 'healthy') {
            console.log('healthy ,', ingredient)
            list.push(ingredient?.name)
          }
        })
      } else {
        resp?.data?.map((ingredient) => {
          if (ingredient.type == 'allergic') {
            console.log('healthy ,', ingredient)
            list.push(ingredient?.name)
          }
        })
      }
      setIngredients(list)
    })
  }, [])

  return (
    <div className='w-full lg:w-[50%] lg:min-h-screen flex justify-center pt-8 p-2 z-10'>
      {/* all selected inputs */}
      
      <div className='flex flex-col gap-4'>

        <div>
          <p className='text-[20px] font-semibold'>{title}</p>
          <p>Please input all of your {subTitle} ingredients one by one</p>
        </div>

        {/* added ingredients */}
        <div className='flex flex-col gap-2 mt-2'>
          <FormInput
            label='Enter Ingredient'
            type='text'
            text='black'
            value={inputIngredient}
            onChange={(e) => setInputIngredient(e.target.value)}
            placeholder='Example: sugar...'
            required={true}
          />

          <Button title='Add' handleClick={addIngredient} />
        </div>

        <SelectedIngredients
          ingredients={ingredients}
          handleChange={handleChange}
          handleDelete={handleDelete}
        />
        <Button title='Submit' handleClick={submitIngredients} />
        <ToastContainer />
      </div>
    </div>
  )
}

export default ProfileScreen
