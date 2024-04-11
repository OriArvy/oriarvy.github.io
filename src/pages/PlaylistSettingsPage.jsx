import React, { useState } from 'react';
import { useNavigate, useParams, useRouteLoaderData } from 'react-router-dom';
import { fetchSpotifyAccessToken } from '../hooks/spotifyAuth'
import classes from './PlaylistSettingsPage.module.css'
import buttonClasses from './Bracket.module.css'

const PlaylistSettingsPage = () => {
  const [songCount, setSongCount] = useState('');
  const [showSongCountForm, setShowSongCountForm] = useState(false)
  const navigate = useNavigate();
  const { playlistId } = useParams();
  const data = useRouteLoaderData('playlist-details')

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/playlist/${playlistId}/${songCount}`);
  };

  const handleGuessSong = (e) => {
    e.preventDefault();
    navigate(`/playlist/${playlistId}/guess-the-song`);
  }

  const handleSongCountChange = (e) => {
    setSongCount(e.target.value);
  };

  const generateSongLimitOptions = () => {
    const songLimit = 256;
    const minimumSongsRequired = 4;
    const songsInPlaylist = data.tracks.items.length;
    const options = [];

    if (songsInPlaylist >= minimumSongsRequired) {
      for (let i = minimumSongsRequired; i <= songsInPlaylist && i <= songLimit; i *= 2) {
        options.push(i);
      }
    }
    return options;
  };

  const songOptions = generateSongLimitOptions();

  return (
    <>
    {!showSongCountForm &&
    <div style={{ textAlign: 'center' }}> 
      <h1>What would you like to play?</h1>
      <button style={{ marginRight: '20px' }} className={buttonClasses.button} onClick={(() => setShowSongCountForm(true))}>Tournament bracket</button>
      <button style={{ marginLeft: '20px' }} className={buttonClasses.button} onClick={handleGuessSong}>Guess the song</button>
    </div>
    }
    
    {showSongCountForm && 
      <form onSubmit={handleSubmit} className={classes.radioSection}>
        <section>
          <h2>Select number of songs:</h2>
          {songOptions.length >= 1 ? songOptions.map(option => (
            <div className={classes.radioItem} key={option}>
              <input
                  id={option}
                  type="radio"
                  name="songCount"
                  value={option}
                  checked={songCount === `${option}`}
                  onChange={handleSongCountChange}
                />
              <label for={option}>
                {option} songs
              </label>
            </div>
          )) : (
            <div>
              <h2>Error not enough songs in playlist. Make sure you have at least 4 songs in selected playlist</h2>
            </div>
          )}
          {songOptions.length >= 1 && <button type="submit" className={buttonClasses.button}>Start!</button>}
          <button className={buttonClasses.button+ ' ' +classes.backButton} onClick={() => navigate('/search-user-playlist')}>Back</button>
        </section>
      </form>
    }
    </>
  );
};
export default PlaylistSettingsPage;

export const loadPlaylistDetails = async ({ params }) => {
  try {
    const accessToken = await fetchSpotifyAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/playlists/${params.playlistId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch playlist details');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
