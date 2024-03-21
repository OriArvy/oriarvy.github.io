// Matchup.js
import React, { useState } from 'react';
import classes from './Matchup.module.css'

const Matchup = ({ teams, onWinnerSelect }) => {
  const [selectedWinner, setSelectedWinner] = useState(null);
  console.log(teams)

  const handleWinnerSelect = (team) => {
    setSelectedWinner(team);
  };

  const confirmWinner = () => {
    onWinnerSelect(selectedWinner);
  };

  return (
    <>
      <div className={classes.matchup}>
        <div className={selectedWinner && selectedWinner.track.id === teams[0].track.id ? `${classes.team} ${classes.active}` : `${classes.team}`} onClick={() => handleWinnerSelect(teams[0])}>
          <iframe allow="encrypted-media" className={classes.iframePlayer} src={`https://open.spotify.com/embed/track/${teams[0].track.id}?utm_source=oembed`}></iframe>
          <p>{teams[0].track.artists[0].name} - {teams[0].track.name}</p>
        </div>
        <div className={selectedWinner && selectedWinner.track.id === teams[1].track.id ? `${classes.team} ${classes.active}` : `${classes.team}`} onClick={() => handleWinnerSelect(teams[1])}>
          <iframe allow="encrypted-media" className={classes.iframePlayer} src={`https://open.spotify.com/embed/track/${teams[1].track.id}?utm_source=oembed`}></iframe>
          <p>{teams[1].track.artists[0].name} - {teams[1].track.name}</p>
        </div>
      </div>
      {selectedWinner && (
        <div className={classes.confirmation}>
          <h2>Confirm Selection: {selectedWinner.track.artists[0].name} - {selectedWinner.track.name}</h2>
          <button className={classes.button} onClick={confirmWinner}>Confirm</button>
        </div>
      )}
    </>
  );
};

export default Matchup;

