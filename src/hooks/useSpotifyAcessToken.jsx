import { useState, useEffect } from 'react';
import { fetchSpotifyAccessToken } from './spotifyAuth'; // Adjust the path as necessary

const useSpotifyAccessToken = () => {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      const token = await fetchSpotifyAccessToken();
      setAccessToken(token);
    };

    getToken();
  }, []);

  return accessToken;
};

export default useSpotifyAccessToken;