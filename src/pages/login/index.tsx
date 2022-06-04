import { GetServerSideProps } from "next"
import { getProviders, signIn } from 'next-auth/react'

const Login = ({ providers }) => {
  return (
    <div className="flex flex-col items-center min-h-screen w-full justify-center">
      <img className="w-52 mb-5" src="https://links.papareact.com/9xl" alt="Spotify" />

      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button 
            onClick={() => {
              signIn(provider.id, { callbackUrl: '/' })
            }} 
            className="bg-[#18D860] text-white p-5 rounded-full"
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders()

  return {
    props: {
      providers
    }
  }
}

export default Login

