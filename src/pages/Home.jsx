import Container from '../components/Container'
import Header from '../components/Header'
import useCredentials from '../hooks/useCredentials'

export default function Home() {

    const { s3, credentials } = useCredentials()

    return (
        <div className='w-full min-h-dvh bg-[#101010] text-gray-300'>
            <Header credentials={credentials} />
            <Container s3={s3} />
        </div>
    )
} 
