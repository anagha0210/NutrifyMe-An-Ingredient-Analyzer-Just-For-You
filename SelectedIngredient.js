import React, { useEffect, useState } from 'react'

export const SelectedIngredients = ({
  ingredients,
  handleChange,
  handleDelete,
}) => {
  return (
    <div className='bg-gray-100 w-full sm:w-[400px] overflow-auto border-2 border-black h-[250px] p-4 rounded-[12px] flex gap-2 flex-wrap'>
      {ingredients?.map((ingredient, index) => {
        return (
          <Ingredient
            key={index}
            index={index}
            value={ingredient}
            handleChange={handleChange}
            handleDelete={handleDelete}
          />
        )
      })}
    </div>
  )
}

const Ingredient = ({ index, value, handleChange, handleDelete }) => {
  const [inputIngredient, setInputIngredient] = useState(value)
  const handleInputChange = (e) => {
    handleChange(index, e.target.value)
  }

  useEffect(() => {
    setInputIngredient(value)
  }, [value])

  return (
    <div className='w-[100px] h-[40px] relative bg-white rounded-[10px] '>
      <input
        className='w-full h-full rounded-[10px] pl-2'
        type='text'
        name='name'
        value={inputIngredient}
        onChange={handleInputChange}
      />
      <img
        className='w-4 h-4 absolute top-1 right-1 cursor-pointer'
        src='assets/close.svg'
        onClick={() => handleDelete(index)}
      />
    </div>
  )
}
