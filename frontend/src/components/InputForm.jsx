import { useState, useEffect } from 'react'
import Button from '../components/Button'

const baseApiUrl = import.meta.env.VITE_BASE_API_URL

const ApiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const InputForm = ({ setRefresh }) => {
  const [userInput, setUserInput] = useState('')
  const [apiStatus, setApiStatus] = useState(ApiStatusConstants.initial)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleOnChange = (e) => {
    if (e.target.value.trim() !== '') setError('')
    setUserInput(e.target.value)
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()

    if (userInput.trim() === '') {
      setError("Input can't be Empty")
      return
    }

    try {
      setApiStatus(ApiStatusConstants.inProgress)
      setError('')
      setMessage('')

      const response = await fetch(`${baseApiUrl}/save-version`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: userInput }),
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err?.errorMessage || 'Failed Fetching Data')
      }

      const data = await response.json()
      setRefresh()
      setMessage(data.message)
      setUserInput('')
      setApiStatus(ApiStatusConstants.success)
    } catch (err) {
      console.error(err)
      setApiStatus(ApiStatusConstants.failure)
      setError(err.message || 'Something went wrong')
    }
  }

  useEffect(() => {
    if (apiStatus === ApiStatusConstants.success) {
      const timer = setTimeout(() => setMessage(''), 1000)
      return () => clearTimeout(timer)
    }
  }, [apiStatus])

  return (
    <form
      onSubmit={handleOnSubmit}
      className="flex flex-col m-10 gap-5 w-full md:w-[70vw] lg:w-1/2 mx-auto justify-center items-center p-5 shadow-lg rounded-2xl bg-zinc-50"
    >
      <textarea
        className="p-3 border border-purple-400 rounded-xl focus:ring-2 focus:ring-purple-900 w-full outline-none"
        value={userInput}
        onChange={handleOnChange}
        rows="4"
        placeholder="Enter your content here"
      />

      <Button
        ButtonType="submit"
        Disabled={apiStatus === ApiStatusConstants.inProgress}
      >
        {apiStatus === ApiStatusConstants.inProgress
          ? 'Saving...'
          : 'Save Version'}
      </Button>

      {error && <p className="text-red-500 text-md">* {error}</p>}
      {message && <p className="text-green-600 text-md">{message}</p>}
    </form>
  )
}

export default InputForm
