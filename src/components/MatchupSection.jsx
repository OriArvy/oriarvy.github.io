import Matchup from "./Matchup";
import classes from './MatchupSection.module.css'

const MatchupSection = ({ currentMatchupIndex, matchups, handleWinnerSelect }) => {
  return (
  <div>
    <h2 className={classes.matchupText}>Selection {currentMatchupIndex + 1}/{matchups.length} </h2>
    <Matchup
      key={currentMatchupIndex}
      teams={matchups[currentMatchupIndex].teams}
      onWinnerSelect={handleWinnerSelect}
    />
  </div>
)};

export default MatchupSection