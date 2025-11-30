import { useState } from 'react'
import AuditLogs from '../components/AuditLogs'
import InputForm from '../components/InputForm'

const Home = () => {
  const [onLogUpdate, setRefresh] = useState(0)
  return (
    <main className="min-h-screen py-10 px-4 bg-linear-to-t from-purple-200 to-zinc-200">
      <h1 className="text-center text-xl font-bold" aria-label="title">
        Audit Logs
      </h1>
      <InputForm setRefresh={() => setRefresh((prev) => prev + 1)} />
      <AuditLogs onLogUpdate={onLogUpdate} />
    </main>
  )
}

export default Home
