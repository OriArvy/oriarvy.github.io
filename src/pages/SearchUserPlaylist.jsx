import { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import { useSearchParams } from 'react-router-dom'
import { Suspense } from 'react'
import useSpotifyAccessToken from '../hooks/useSpotifyAcessToken'
import PlaylistItem from '../components/PlaylistItem'
import classes from './SearchUserPlaylist.module.css'
import { motion } from 'framer-motion'
import Modal from '../components/Modal'
import ConfirmationButton from '../components/ConfirmationButton'

const SearchPage = () => {
  const accessToken = useSpotifyAccessToken()
  const [userPlaylists, setUserPlaylists] = useState([])
  const [selectedPlaylist, setSelectedPlaylist] = useState('')
  const [error, setError] = useState(null)
  const [search, setSearch] = useSearchParams()
  const [modal, setModal] = useState(false)

  useEffect(() => {
    const storedPlaylists = localStorage.getItem('playlists')
    if (storedPlaylists) {
      setUserPlaylists(JSON.parse(storedPlaylists))
    }
  }, [])

  const handleSearch = async searchTerm => {
    setError(null)
    setUserPlaylists([])
    setSelectedPlaylist('')
    setSearch('')
    localStorage.removeItem('playlists')

    if (!accessToken) {
      console.error('Spotify access token is not available')
      return
    }

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/users/${searchTerm.toLowerCase()}/playlists?limit=50`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch user playlists')
      }

      search.set('query', searchTerm)
      setSearch(search, { replace: true })

      const data = await response.json()

      if (data.items.length === 0) {
        throw new Error('This user has no available playlists')
      }

      setUserPlaylists(data.items)
      localStorage.setItem('playlists', JSON.stringify(data.items))
      setSelectedPlaylist('')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <motion.div
      initial={{ y: -25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        ease: 'linear',
        duration: 0.5,
      }}
    >
      <Suspense fallback={<div className={classes.loading}><div className={classes.spinner}></div></div>}>
        <div className={classes.searchContainer}>
          <h2 className={classes.searchText}>Search Spotify Playlist</h2>
          <SearchBar onSearch={handleSearch} />
          {error && <p className={classes.error}>{error}</p>}
        </div>
        <ul className={classes.playlists}>
          {userPlaylists.map((playlist, i) => (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.15, delay: i * 0.15 }}
              onClick={() => {setSelectedPlaylist(playlist), setModal(true)}}
              key={playlist.id}
            >
              <PlaylistItem
                selectedPlaylistId={selectedPlaylist.id}
                id={playlist.id}
                name={playlist.name}
                totalTracks={playlist.tracks.total}
                image={playlist.images[0]?.url || 'defaultPlaylistImageURL'}
              />
            </motion.div>
          ))}
        </ul>
        {modal &&
          <Modal isOpen={modal} onClose={() => setModal(false)}>
            <ConfirmationButton playlist={selectedPlaylist} />
          </Modal>
        }
        {selectedPlaylist && (
          <div className={classes.confirmation}>
            <ConfirmationButton playlist={selectedPlaylist} />
          </div>
        )}
      </Suspense>
    </motion.div>
  )
}

export default SearchPage
