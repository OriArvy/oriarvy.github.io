import TournamentComplete from "./TournamentComplete";
import classes from '../pages/Bracket.module.css'

const RoundSummary = ({ winners, currentRound, setCurrentMatchupIndex, setTeams, setWinners, setCurrentRound, tournamentHistory }) => {
  console.log(winners.length)
  if (winners.length === 1) {
    console.log('Winners length is 1')
    localStorage.removeItem('teams');
    localStorage.removeItem('matchups');
    localStorage.removeItem('winners');
    localStorage.removeItem('currentMatchupIndex');
    localStorage.removeItem('currentRound');
    localStorage.removeItem('tournamentHistory');
  }
  return (
    <div className={classes.infoContainer}>
      {winners.length > 1 ? (
        <>
          <h2>Round {currentRound} finished!</h2>
          <button className={classes.button} onClick={() => {
            setCurrentMatchupIndex(0);
            setTeams(winners);
            setWinners([]);
            setCurrentRound(currentRound + 1);
          }}>
            Start Next Round
          </button>
        </>
      ) : winners.length === 1 ? (
        <TournamentComplete winners={winners} tournamentHistory={tournamentHistory} />
      ) : null}
    </div>
  );
};

export default RoundSummary