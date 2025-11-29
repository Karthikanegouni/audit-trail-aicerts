import { useEffect, useState } from 'react'
import Button from '../components/Button'

const baseApiUrl = import.meta.env.VITE_BASE_API_URL

const ApiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const InputForm = () => {
  const [userInput, setUserInput] = useState('')
  const [apiStatus, setApiStatus] = useState(ApiStatusConstants.initial)
  const [error, setError] = useState('')

  const handleOnChange = (event) => {
    if (event.target.value.trim() !== '') setError('')
    setUserInput(event.target.value)
  }

  const handleOnSubmit = async (event) => {
    event.preventDefault()
    if (userInput.trim() === '') {
      return setError("Input can't be Empty")
    }
    setError('')
    setApiStatus(ApiStatusConstants.inProgress)
  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className="flex flex-col m-10 gap-5 w-full md:w-[70vw] lg:w-1/2 mx-auto justify-center items-center p-5 border border-gray-400 shadow-lg rounded-2xl"
    >
      <textarea
        className="p-3 border border-purple-400 rounded-xl focus:ring-2 focus:ring-purple-900 w-full outline-none"
        value={userInput}
        onChange={handleOnChange}
        name="contentEditor"
        rows="4"
        placeholder="Enter your content here"
      />
      <Button ButtonType="submit">
        {apiStatus === ApiStatusConstants.inProgress
          ? 'Saving...'
          : 'Save Version'}
      </Button>
      <p className="text-red-500 text-md">{error && `* ${error}`}</p>
    </form>
  )
}

export default InputForm
