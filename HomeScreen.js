import React, { useEffect, useState } from 'react'
import { createWorker } from 'tesseract.js'
import { SelectedIngredients } from 'shared/SelectedIngredient'
import Button from 'screens/auth/components/Button'
import Tesseract from 'tesseract.js'
import Spinner from 'shared/Spinner'
// api integration
import axiosClient from 'apiReq/axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const HomeScreen = () => {
  const storedData = JSON.parse(localStorage.getItem('userData'))

  const [ingredients, setIngredients] = useState([])
  const [loading, setLoading] = useState(false)

  const [chocolateLoading, setChocolateLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [recommendations, setRecommendations] = useState()

  const extractIngredients = (ocrText) => {
    let ls = ocrText.split(' ')
    console.log('*list is', ls)
    ls = ls?.map((ingredient) => {
      if (ingredient?.length > 2) {
        return ingredient
      }
    })
    console.log('*list is', ls)
    setIngredients(ls)
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
  const getRecommendations = () => {
    if (ingredients.length > 0) {
      setLoading(true)
      axiosClient
        .post('checkIngredients', {
          userId: storedData?.id,
          ingredients: ingredients,
        })
        .then((resp) => {
          setLoading(false)
          if (resp?.data === 'ingredients are healthy') {
            setMessage('The ingredients of this chocolate are healthy for you')
          } else {
            setMessage(
              'The chocolate contains allergic ingredients and could be harmful for you'
            )
          }
        })
        .catch(() => {
          setLoading(false)
          toast.error('Network error: please try later', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          })
        })
    }
  }
  const getRecommendedChocolates = () => {
    setChocolateLoading(true)
    axiosClient
      .post('recommendChocolates', {
        userId: storedData?.id,
      })
      .then((resp) => {
        setChocolateLoading(false)
        setRecommendations(resp?.data)
        setMessage('The ingredients of this chocolate are healthy for you')
      })
      .catch(() => {
        setChocolateLoading(false)
        toast.error('Network error: please try later', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        })
      })
  }

  return (
    <div className='w-full min-h-screen bg-gray-50 flex flex-col items-center relative '>
      <img src="assets/pbg.jpeg" width='99.99%' height='70%' className="absolute" />
      <div className='w-[80%] flex flex-col gap-4 z-10'>
        <div>
          <p className='text-[20px] font-semibold'>
            Recommendation for You ^-^
          </p>
          <p>Here is what we recommend based on your profile!</p>
        </div>
        <div className='w-full sm:w-[400px] h-full flex flex-col gap-2'>
          <Button
            title='Recommend Chocolates'
            handleClick={getRecommendedChocolates}
            loading={chocolateLoading}
          />

          {recommendations && (
            <div>
              <p className='text-[20px] font-bold text-center'>
                Recommend Chocolates
              </p>
              {recommendations.length > 0 ? (
                recommendations?.map((chocolate) => {
                  return (
                    <p className='text-[16px] text-green-500 font-semibold'>
                      {chocolate}
                    </p>
                  )
                })
              ) : (
                <p className='text-[16px] text-red-500 font-semibold'>
                  Sorry, Seems like there's no recommended chocolate for you..
                </p>
              )}
            </div>
          )}

          <ImageToText extractIngredients={extractIngredients} />  
          <SelectedIngredients
            ingredients={ingredients}
            handleChange={handleChange}
            handleDelete={handleDelete}
          />
          <Button
            title='Submit'
            handleClick={getRecommendations}
            loading={loading}
          />
        </div>
        {message && (
          <div>
            <p className='text-[20px] font-bold'>Result:</p>
            <p className='text-[16px] text-red-500 font-semibold'>{message}</p>
          </div>
        )}
      </div>
    </div>
  )
}

const ImageToText = ({ extractIngredients }) => {     //fetching the ingredients
  const [ocr, setOcr] = useState('')
  const [imageData, setImageData] = useState(null)
  const [loading, setLoading] = useState(false)

  const convertImageToText = async () => {
    if (!imageData) return
    setOcr('')
    setLoading(true)
    Tesseract.recognize(imageData, 'eng', { logger: (m) => console.log(m) })
      .then(({ data: { text } }) => {
        setOcr(text)
        extractIngredients(text)
        setLoading(false)

        console.log('tessareact response is', text)
      })
      .catch((err) => {
        setLoading(false)
      })
  }

  useEffect(() => {
    convertImageToText()
  }, [imageData])

  function handleImageChange(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      const imageDataUri = reader.result
      console.log({ imageDataUri })
      setImageData(imageDataUri)
    }
    reader.readAsDataURL(file)
  }
  return (
    <div className=''>
      <div>
        <p>Choose an Image</p>
        <input
          type='file'
          name=''
          id=''
          onChange={handleImageChange}
          accept='image/*'
        />
      </div>
      <div className='w-full'>
        {imageData && (
          <img
            className='w-full h-[300px] bg-red-100 rounded-[12px] object-contain flex flex-col mt-2'
            src={imageData}
            alt=''
            srcSet=''
          />
        )}
      </div>

      {loading ? (
        <div className='w-full h-40'>
          <Spinner />
        </div>
      ) : (
        <div className='w-full text-black mt-2'>
          <p>{ocr}</p>                                     
        </div>
      )}
    </div>
  )
}

export default HomeScreen
