export const fetchSpotifyAccessToken = async () => {
  const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID_KEY;
  const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET_KEY;

  const authParams = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  });

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: authParams.toString(),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Spotify access token');
  }

  const data = await response.json();
  return data.access_token;
};