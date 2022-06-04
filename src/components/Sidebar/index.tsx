import { signOut, useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'

import {
  HomeOutline,
  LibraryOutline,
  Search,
  PlusCircleOutline,
  RssOutline,
  HeartOutline
} from 'heroicons-react'
import { useEffect, useState } from 'react'
import useSpotify from '../../hoocks/spotify/useSpotify'
import { playlistIdState } from '../../atoms/playlistAtom'

export const Sidebar = () => {
  const { data: session, status } = useSession()
  const spotifyApi = useSpotify()
  const [playlists, setPlaylists] = useState([])
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items)
      })
    }
  }, [session])

  return (
    <div className='text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36'>
      <div className='space-y-4'>
        <button className=' flex items-center space-x-2 hover:text-white'>
          <HomeOutline />
          <p>Home</p>
        </button>
        <button className=' flex items-center space-x-2 hover:text-white'>
          <Search />
          <p>Search</p>
        </button>
        <button className=' flex items-center space-x-2 hover:text-white'>
          <LibraryOutline />
          <p>Your Library</p>
        </button>

        <hr className='border-t-[0.1px] border-gray-900' />

        <button className=' flex items-center space-x-2 hover:text-white'>
          <PlusCircleOutline />
          <p>Create Playlist</p>
        </button>
        <button className=' flex items-center space-x-2 hover:text-white'>
          <HeartOutline />
          <p>Like Songs</p>
        </button>
        <button className=' flex items-center space-x-2 hover:text-white'>
          <RssOutline />
          <p>Your Episodes</p>
        </button>

        <hr className='border-t-[0.1px] border-gray-900' />

        <ul className='cursor-pointe hover:text-white'>
          {playlists.map((playlist) => {
            return (
              <li key={playlist.id} onClick={() => setPlaylistId(playlist.id)} className='cursor-pointer hover:text-white'>
                {playlist.name}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}