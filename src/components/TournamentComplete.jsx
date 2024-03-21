import { useState } from 'react'
import classes from '../pages/Bracket.module.css'
import TournamentHistory from './TournamentHistory';

const TournamentComplete = ({ winners, tournamentHistory }) => {
  const [showHistory, setShowHistory] = useState(false)

  function handleToggleTournamentHistory() {
    setShowHistory(!showHistory)
  }

  return (
  <div>
    <h2>Tournament Complete!</h2>
    <p>Final Winner: {winners[0].track.name}</p>
    <iframe allow="encrypted-media" height="300" width="500" style={{border: 'none'}} src={`https://open.spotify.com/embed/track/${winners[0].track.id}?utm_source=oembed`}></iframe>
    <div>
      <button className={classes.button} onClick={handleToggleTournamentHistory}>See Tournament history</button>
    </div>
    {showHistory && 
      <TournamentHistory tournamentHistory={tournamentHistory} />
    }
  </div>
  )
};

export default TournamentComplete
