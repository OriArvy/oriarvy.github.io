import React, { useState, useEffect } from 'react';
import MatchupSection from '../components/MatchupSection';
import RoundSummary from '../components/RoundSummary';
import { useParams, useRouteLoaderData } from 'react-router-dom';
import classes from './Bracket.module.css';

const BracketPage = () => {
  const [teams, setTeams] = useState([]);
  const [matchups, setMatchups] = useState([]);
  const [winners, setWinners] = useState([]);
  const [currentMatchupIndex, setCurrentMatchupIndex] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [tournamentHistory, setTournamentHistory] = useState([]);
  const [error, setError] = useState('');
  const { songCount } = useParams();
  const playlistData = useRouteLoaderData('playlist-details');
  const initialTeams = playlistData.tracks.items

  useEffect(() => {
    if (!initialTeams || initialTeams.length < 4) {
      setError('Playlist must have at least 4 items.');
      return;
    }
    try {
      const shuffledTeams = shuffleAndLimitPlaylistItems([...initialTeams], songCount);
      setTeams(shuffledTeams);
    } catch (e) {
      setError(e.message);
    }
  }, [initialTeams]);

  useEffect(() => {
    setMatchups(createMatchups(teams));
  }, [teams]);

  const shuffleAndLimitPlaylistItems = (tracks, limit) => {
    shuffleArray(tracks);
    return tracks.slice(0, limit);
  };

  const createMatchups = (teams) => {
    let newMatchups = [];
    for (let i = 0; i < teams.length; i += 2) {
      newMatchups.push({ teams: [teams[i], teams[i + 1]] });
    }
    return newMatchups;
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const handleWinnerSelect = (winner) => {
    const updatedWinners = [...winners, winner];
    const nextIndex = currentMatchupIndex + 1;
    if (currentMatchupIndex === 0) {
      setTournamentHistory(prevHistory => [...prevHistory, { round: currentRound, matchups }]);
    }

    if (currentMatchupIndex < matchups.length) {
      setCurrentMatchupIndex(nextIndex);
    }
    setWinners(updatedWinners);
  };

  if (error) {
    return <div className={classes.error}>{error}</div>;
  }

  return (
    <div>
      <div className="bracket">
        {currentMatchupIndex < matchups.length ? (
          <MatchupSection
            currentMatchupIndex={currentMatchupIndex}
            matchups={matchups}
            handleWinnerSelect={handleWinnerSelect}
          />
        ) : (
          <RoundSummary
            winners={winners}
            currentRound={currentRound}
            setCurrentMatchupIndex={setCurrentMatchupIndex}
            setTeams={setTeams}
            setWinners={setWinners}
            setCurrentRound={setCurrentRound}
            tournamentHistory={tournamentHistory}
          />
        )}
      </div>
    </div>
  );
};

export default BracketPage