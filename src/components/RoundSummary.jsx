import TournamentComplete from './TournamentComplete'
import classes from '../pages/Bracket.module.css'
import { motion } from 'framer-motion'

const RoundSummary = ({
  winners,
  currentRound,
  setCurrentMatchupIndex,
  setTeams,
  setWinners,
  setCurrentRound,
  tournamentHistory,
}) => {
  return (
    <motion.div
      initial={{ y: -25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        ease: 'linear',
        duration: 0.5,
      }}
      className={classes.infoContainer}
    >
      {winners.length > 1 ? (
        <>
          <h2>Round {currentRound} finished!</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className={classes.button}
            onClick={() => {
              setCurrentMatchupIndex(0)
              setTeams(winners)
              setWinners([])
              setCurrentRound(currentRound + 1)
            }}
          >
            Start Next Round
          </motion.button>
        </>
      ) : winners.length === 1 ? (
        <TournamentComplete
          winners={winners}
          tournamentHistory={tournamentHistory}
        />
      ) : null}
    </motion.div>
  )
}

export default RoundSummary
