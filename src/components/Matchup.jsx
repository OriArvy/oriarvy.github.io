import { useState } from 'react'
import classes from './Matchup.module.css'
import { motion } from 'framer-motion'

const Matchup = ({ teams, onWinnerSelect }) => {
  console.log('im in matchup')
  const [selectedWinner, setSelectedWinner] = useState(null)

  const handleWinnerSelect = team => {
    setSelectedWinner(team)
  }

  const confirmWinner = () => {
    onWinnerSelect(selectedWinner)
  }

  return (
    <div>
      <div className={classes.matchup}>
        <motion.div
          initial={{ x: -150, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            ease: 'linear',
            duration: 0.5,
          }}
          whileHover={{ scale: 1.1 }}
          className={
            selectedWinner && selectedWinner.track.id === teams[0].track.id
              ? `${classes.team} ${classes.active}`
              : `${classes.team}`
          }
          onClick={() => handleWinnerSelect(teams[0])}
        >
          <iframe
            allow='encrypted-media'
            className={classes.iframePlayer}
            src={`https://open.spotify.com/embed/track/${teams[0].track.id}?utm_source=oembed`}
          ></iframe>
          <p>
            {teams[0].track.artists[0].name} - {teams[0].track.name}
          </p>
        </motion.div>
        <motion.div
          initial={{ x: 150, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            ease: 'linear',
            duration: 0.5,
          }}
          whileHover={{ scale: 1.1 }}
          className={
            selectedWinner && selectedWinner.track.id === teams[1].track.id
              ? `${classes.team} ${classes.active}`
              : `${classes.team}`
          }
          onClick={() => handleWinnerSelect(teams[1])}
        >
          <iframe
            allow='encrypted-media'
            className={classes.iframePlayer}
            src={`https://open.spotify.com/embed/track/${teams[1].track.id}?utm_source=oembed`}
          ></iframe>
          <p>
            {teams[1].track.artists[0].name} - {teams[1].track.name}
          </p>
        </motion.div>
      </div>
      {selectedWinner && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            ease: 'linear',
            duration: 0.5,
          }}
          className={classes.confirmation}
        >
          <h2>
            Confirm Selection: {selectedWinner.track.artists[0].name} -{' '}
            {selectedWinner.track.name}
          </h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className={classes.button}
            onClick={confirmWinner}
          >
            Confirm
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}

export default Matchup
