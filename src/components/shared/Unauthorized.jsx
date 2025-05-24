import { useNavigate } from "react-router-dom"


const Unauthorized = () => {
  const navigate = useNavigate()


  return (
    <div className="flex flex-col justify-center items-center h-dvh">
        <h1 className="text-9xl font-semibold text-secondary">404</h1>
        <p className="max-w-2xl mx-auto text-center text-gray-400">Gain secure access to your personalized dashboard to efficiently monitor analytics, manage operations, and make informed decisions — all in one centralized platform.🛠️</p>
        <button 
        onClick={() => navigate(-1)}
        className="bg-sky-600 hover:bg-sky-800 text-[#fff] px-4 py-2 rounded-md mt-3 font-semibold">GO BACK</button>
    </div>
  )
}

export default Unauthorized