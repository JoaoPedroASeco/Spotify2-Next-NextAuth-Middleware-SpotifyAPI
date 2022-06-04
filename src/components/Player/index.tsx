import { useRecoilState } from 'recoil'
import { currentTrackIdState, isPlayingState } from '../../atoms/songAtom'
import useSpotify from '../../hoocks/spotify/useSpotify'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'
import useSongInfo from '../../hoocks/spotify/useSongInfo'
import { FastForward, Pause, Play, Reply, Rewind, SwitchHorizontal, VolumeOff, VolumeUp, VolumeUpOutline } from 'heroicons-react'
import { debounce } from 'lodash'

export const Player = () => {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [volume, setVolume] = useState(50)

  const songInfo = useSongInfo()

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then(data => {
        setCurrentTrackId(data?.body?.item?.id)

        spotifyApi.getMyCurrentPlaybackState().then(data => {
          setIsPlaying(data?.body?.is_playing)
        })
      })
    }
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong()
      setVolume(50)
    }
  }, [currentTrackId, spotifyApi, session])

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause()
        setIsPlaying(false)
      } else {
        spotifyApi.play()
        setIsPlaying(true)
      }
    })
  }

  useEffect(() => {
    if(volume > 0 && volume < 100) {
      debounceAdjustVolume(volume)
    }
  }, [volume])

  const debounceAdjustVolume = useCallback(
    debounce((volume) => {
     spotifyApi.setVolume(volume).catch(err => {})
    }, 500),
    []
  )

  return (
    <div className='h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8'>
      <div className=' flex items-center space-x-4'>
        <img className='hidden md:inline h-10 w-10' src={songInfo?.album.images?.[0]?.url} alt="" />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      <div className='flex items-center justify-evenly'>
        <SwitchHorizontal className='button' />

        <Rewind
          onClick={() => { }}
          className='button'
        />

        {isPlaying ? (
          <Pause onClick={handlePlayPause} className='button w-10 h-10' />
        ) : (
          <Play onClick={handlePlayPause} className='button w-10 h-10' />
        )}

        <FastForward className='button' />

        <Reply className='button' />
      </div>

      <div className='flex items-center pace-x-3 md:space-x-4 justify-end'>
        <VolumeUpOutline className='button' onClick={() => volume > 0 && setVolume(volume - 10)}/>
        <input className='w-14 md:w-20' type="range" value={volume} onChange={e => setVolume(e.target.value)} min={0} max={100} />
        <VolumeUp className='button' onClick={() => volume < 100 && setVolume(volume + 10)}/>
      </div>
    </div>
  )
}