import { useEffect, useState } from 'react'
import LogItem from './LogItem'
import Loader from './Loader'

const baseApiUrl = import.meta.env.VITE_BASE_API_URL

const ApiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const AuditLogs = ({ onLogUpdate }) => {
  const [data, setData] = useState([])
  const [apiStatus, setApiStatus] = useState(ApiStatusConstants.initial)

  useEffect(() => {
    fetchVersions()
  }, [onLogUpdate])

  const fetchVersions = async () => {
    setApiStatus(ApiStatusConstants.inProgress)
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const response = await fetch(`${baseApiUrl}/versions`, options)
      if (!response.ok) {
        setApiStatus(ApiStatusConstants.failure)
        throw new Error('Failed to fetch versions')
      }
      const result = await response.json()
      setData(result)
      setApiStatus(ApiStatusConstants.success)
    } catch (e) {
      console.error(e.errorMessage)
      setApiStatus(ApiStatusConstants.failure)
    }
  }

  return (
    <div className="w-full md:w-[70vw] lg:w-1/2 mx-auto">
      <h2 className="text-center font-bold my-5">Logs</h2>
      {apiStatus === ApiStatusConstants.inProgress && <Loader />}
      {apiStatus === ApiStatusConstants.success &&
        (data.length === 0 ? (
          <>
            <img
              src="https://res.cloudinary.com/dkrtuozcv/image/upload/v1764492361/no-data_zgme8f.png"
              alt="no data found"
              className="w-[100px] lg:w-[150px] mx-auto "
            />
            <p className="text-purple-900 text-lg text-center font-semibold">
              No saved Versions
            </p>
          </>
        ) : (
          <ul className="flex flex-col gap-3 shadow-sm">
            {data.map((version) => (
              <LogItem key={version.id} data={version} />
            ))}
          </ul>
        ))}
      {apiStatus === ApiStatusConstants.failure && (
        <p className="text-red-500 text-lg text-center mt-10 font-semibold">
          * Failed to Fetch Data
        </p>
      )}
    </div>
  )
}

export default AuditLogs
