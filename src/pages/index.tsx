import { getSession } from "next-auth/react"
import Head from "next/head"
import Center from "../components/Center"
import { Player } from "../components/Player"
import { Sidebar } from "../components/Sidebar"

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Head>
        <title>Spotify</title>
      </Head>

      <main className="flex">
        <Sidebar />
        <Center />
      </main>

      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session
    }
  }
}

export default Home
