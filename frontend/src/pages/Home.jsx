import AuditLogs from '../components/AuditLogs'
import InputForm from '../components/InputForm'

const Home = () => {
  return (
    <main className="bg-linear-to-b from-purple-200 to-zinc-100 min-h-screen py-10 px-4">
      <h1 className="text-center text-xl font-bold" aria-label="title">
        Content Logs
      </h1>
      <InputForm />
      <AuditLogs />
    </main>
  )
}

export default Home
