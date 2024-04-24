import usePremadePlaylists from '../hooks/usePremadePlaylists'
import PlaylistItem from '../components/PlaylistItem'
import { useState, useMemo } from 'react'
import classes from './SearchUserPlaylist.module.css'
import { motion } from 'framer-motion'
import Modal from '../components/Modal'
import ConfirmationButton from '../components/ConfirmationButton'

const PremadePlaylistsPage = () => {
  const playlistIds = useMemo(
    () => [
      '0ImbTL9gm01nStEsaCmj16',
      '5ABHKGoOzxkaa28ttQV9sE',
      '3FeewjLi5LMzIpV4h35QEz',
      '2L2HwKRvUgBv1YetudaRI3',
      '041EEjr8FMkWlzbuKnSXYD',
      '37i9dQZF1DX186v583rmzp',
      '2fnTFwiqrU1mwIVGb7hiVs',
      '37i9dQZF1DX3Kdv0IChEm9',
      '37i9dQZF1DX4WYpdgoIcn6',
      '6HaBsd2NrzZfyYYiV69diZ',
    ],
    []
  )
  const [selectedPlaylist, setSelectedPlaylist] = useState('')
  const { playlists, loading, error } = usePremadePlaylists(playlistIds)
  const [modal, setModal] = useState(false)

  if (loading) return (<div className={classes.loading}><div className={classes.spinner}></div></div>)
  if (error) return <div>Error: {error}</div>

  return (
    <div className={classes.playlists}>
      {playlists.map((playlist, index) => (
        <div key={index}>
          <motion.div
            key={playlist.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.15, delay: index * 0.15 }}
            onClick={() => {setSelectedPlaylist(playlist), setModal(true)}}
          >
            <PlaylistItem
              selectedPlaylistId={selectedPlaylist.id}
              id={playlist.id}
              name={playlist.name}
              totalTracks={playlist.tracks.total}
              image={playlist.images[0]?.url || 'defaultPlaylistImageURL'}
            />
          </motion.div>
        </div>
      ))}
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
    </div>
  )
}

export default PremadePlaylistsPage
