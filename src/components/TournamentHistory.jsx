import classes from './TournamentHistory.module.css'
import { motion } from 'framer-motion';

const TournamentHistory = ({ tournamentHistory }) => {
  const calculateCumulativeDelay = (currentRoundIndex) => {
    let delay = 0;
    for (let i = 0; i < currentRoundIndex; i++) {
      delay += tournamentHistory[i].matchups.length * 0.5;
    }
    return delay;
  };

  return (
    <div className="tournament-history">
      <h2>Tournament History</h2>
      <div className={classes.container}>
        {tournamentHistory.map((round, roundIndex) => (
          <div
           key={roundIndex} className={classes.roundContainer}>
            {round.matchups.map((matchup, matchupIndex) => (
              <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: calculateCumulativeDelay(roundIndex) + matchupIndex * 0.5 }}
              key={matchupIndex}
              className={classes.matchup}>
                <p>
                  {matchup.teams[0].track.artists[0].name} - {matchup.teams[0].track.name}
                </p>
                <p>
                {matchup.teams[1].track.artists[0].name} - {matchup.teams[1].track.name}
                </p>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentHistory;
