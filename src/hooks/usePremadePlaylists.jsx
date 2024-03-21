import { useState, useEffect } from "react";
import { fetchSpotifyAccessToken } from './spotifyAuth'

const usePremadePlaylists = (playlistIds) => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      setLoading(true);
      try {
        const accessToken = await fetchSpotifyAccessToken();
        const promises = playlistIds.map(id => fetch(`https://api.spotify.com/v1/playlists/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }))
        
        const results = await Promise.all(promises);
        const playlistsData = await Promise.all(results.map(result => {
          if (!result.ok) throw new Error('Failed to fetch playlist details');
          return result.json();
        }));
  
        setPlaylists(playlistsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, [playlistIds]); // Re-run the hook if the playlistIds change

  return { playlists, loading, error };
};

export default usePremadePlaylists
