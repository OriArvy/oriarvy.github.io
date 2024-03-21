import React from 'react';
import classes from './TournamentHistory.module.css'

const TournamentHistory = ({ tournamentHistory }) => {
  return (
    <div className="tournament-history">
      <h2>Tournament History</h2>
      <div className={classes.container}>
        {tournamentHistory.map((round, roundIndex) => (
          <div key={roundIndex} className={classes.roundContainer}>
            {round.matchups.map((matchup, matchupIndex) => (
              <div key={matchupIndex} className={classes.matchup}>
                <p>
                  {matchup.teams[0].track.artists[0].name} - {matchup.teams[0].track.name}
                </p>
                <p>
                {matchup.teams[1].track.artists[0].name} - {matchup.teams[1].track.name}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentHistory;
