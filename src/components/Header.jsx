import { useNavigate } from "react-router-dom"
import useCredentials from "../hooks/useCredentials"

export default function Header() {

    const { credentials } = useCredentials()
    const navigate = useNavigate()

    function handleDisconnect() {
        localStorage.removeItem("credentials")
        navigate("/config")
    }

    return (
        <div className='bg-[#181818] w-full p-4 border-b border-[#202020] sticky top-0'>
            <div className='w-full max-w-6xl mx-auto flex items-center justify-between'>
                <h3 className='text-xl font-semibold text-gray-200 flex items-center gap-2 select-none'>
                    <span>
                        S3
                    </span>
                    <span className='bg-gradient-to-r from-orange-300 to-red-400 bg-clip-text text-transparent'>
                        Storage
                    </span>
                </h3>

                <div className='flex items-center gap-2'>
                    <div className='bg-[#101010] border border-[#202020] px-4 py-2 flex items-center gap-2 rounded-md select-none'>
                        <div className='w-2 h-2 aspect-square rounded-full bg-green-400 animate-pulse' />
                        <p className='text-xs text-gray-300'>
                            {credentials.region}
                        </p>
                    </div>
                    <button onClick={handleDisconnect} className='bg-red-500 active:bg-red-600 text-white font-medium text-xs px-4 py-2 rounded-md cursor-pointer'>
                        Disconnect
                    </button>
                </div>
            </div>
        </div>
    )
}
