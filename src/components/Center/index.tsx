import { useSession, signOut } from 'next-auth/react'
import { ChevronDownOutline } from 'heroicons-react'
import { useEffect, useState } from 'react'
import { shuffle } from 'lodash'
import { playlistIdState, playlistState } from '../../atoms/playlistAtom'
import { useRecoilState } from 'recoil'
import useSpotify from '../../hoocks/spotify/useSpotify'
import Songs from '../Songs'

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
]

const Center = () => {
  const { data: session } = useSession()
  const spotifyApi = useSpotify()
  const [color, setColor] = useState<string | undefined>('')
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)
  const [playlist, setPlaylist] = useRecoilState(playlistState)

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [playlistId])

  useEffect(() => {
    spotifyApi.getPlaylist(playlistId).then((data) => {
      setPlaylist(data.body)
    }).catch(error => console.log('something went wrong: ', error))
  }, [spotifyApi, playlistId])

  console.log(playlist)

  return (
    <div className="flex-grow flex-col h-screen overflow-y-scroll">
      <header className='absolute top-5 right-8'>
        <div className=' flex items-center  bg-red-300 space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white' onClick={() => signOut()}>
          <img className='rounded-full w-10 h-10' src={session?.user?.image ?? ''} alt="" />
          <p>{session?.user?.name}</p>
          <ChevronDownOutline />
        </div>
      </header>

      <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8 `}>
        <img className='h-44 w-44 shadow-2xl ' src={playlist?.images?.[0]?.url} alt="" />
        <div>
          <p>PLAYLIST</p>
          <h1 className='text-2xl md:text-3xl xl:text-5xl font-bold'>{playlist?.name}</h1>
        </div>
      </section>

      <section>
        <Songs />
      </section>
    </div>
  )
}

export default Center