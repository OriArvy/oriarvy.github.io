import { useState } from 'react'
import classes from '../pages/Bracket.module.css'
import TournamentHistory from './TournamentHistory'
import { motion } from 'framer-motion'

const TournamentComplete = ({ winners, tournamentHistory }) => {
  const [showHistory, setShowHistory] = useState(false)

  function handleToggleTournamentHistory() {
    setShowHistory(!showHistory)
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
      <h2>Tournament Complete!</h2>
      <p>Final Winner: {winners[0].track.name}</p>
      <iframe
        allow='encrypted-media'
        height='300'
        width='500'
        style={{ border: 'none' }}
        src={`https://open.spotify.com/embed/track/${winners[0].track.id}?utm_source=oembed`}
      ></iframe>
      <div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className={classes.button}
          onClick={handleToggleTournamentHistory}
        >
          See Tournament history
        </motion.button>
      </div>
      {showHistory && (
        <TournamentHistory tournamentHistory={tournamentHistory} />
      )}
    </motion.div>
  )
}

export default TournamentComplete
