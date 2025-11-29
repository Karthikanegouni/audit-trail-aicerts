import { useEffect, useState } from 'react'
import LogItem from './LogItem'

const baseApiUrl = import.meta.env.VITE_BASE_API_URL

const ApiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const AuditLogs = () => {
  const [data, setData] = useState([])
  const [apiStatus, setApiStatus] = useState(ApiStatusConstants.initial)

  useEffect(() => {
    fetchVersions()
  }, [])

  const fetchVersions = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const response = await fetch(`${baseApiUrl}/versions`, options)
      if (!response.ok) {
        throw new Error('Failed to fetch versions')
      }
      const result = await response.json()
      console.log(result)
      setData(result)
      setApiStatus(ApiStatusConstants.success)
    } catch (e) {
      console.log(e.errorMessage)
      setApiStatus(ApiStatusConstants.failure)
    }
  }

  return (
    <div className="w-full md:w-[70vw] lg:w-1/2 mx-auto">
      <h2 className="text-center font-bold my-5">Logs</h2>
      <ul className="flex flex-col gap-3 shadow-sm">
        {data.map((version) => (
          <LogItem key={version.id} data={version} />
        ))}
      </ul>
    </div>
  )
}

export default AuditLogs
