import { useRecoilState } from 'recoil'
import { playlistState } from '../../atoms/playlistAtom'
import Song from './Song'

const Songs = () => {
  const [playlist, setPlaylist] = useRecoilState(playlistState)

  return (
    <ul className='px-8 flex flex-col space-y-1 pb-28 text-white'>
      {playlist?.tracks?.items.map((track, index) => {
        return (
          <Song key={track.id} order={index} track={track} />
        )
      })}
    </ul>
  )
}

export default Songs