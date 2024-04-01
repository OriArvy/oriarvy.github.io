import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import { Link, useSearchParams } from 'react-router-dom';
import { Suspense } from 'react';
import useSpotifyAccessToken from '../hooks/useSpotifyAcessToken';
import PlaylistItem from '../components/PlaylistItem';
import classes from './SearchUserPlaylist.module.css';

const SearchPage = () => {
  const accessToken = useSpotifyAccessToken();
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const [error, setError] = useState(null);
  const [search, setSearch] = useSearchParams()

  useEffect(() => {
    const storedPlaylists = localStorage.getItem('playlists');
    if (storedPlaylists) {
      setUserPlaylists(JSON.parse(storedPlaylists));
    }
  }, []);

  const handleSearch = async (searchTerm) => {
    setError(null)
    setUserPlaylists([])
    setSelectedPlaylist('')
    setSearch('')
    localStorage.removeItem('playlists')

    if (!accessToken) {
      console.error('Spotify access token is not available');
      return;
    }

    try {
      const response = await fetch(`https://api.spotify.com/v1/users/${searchTerm}/playlists?limit=50`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user playlists');
      }

      search.set('query', searchTerm)
      setSearch(search, { replace: true})

      const data = await response.json();

      if (data.items.length === 0) {
        throw new Error('This user has no available playlists')
      }

      setUserPlaylists(data.items);
      localStorage.setItem('playlists', JSON.stringify(data.items))
      setSelectedPlaylist('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <div className={classes.searchContainer}>
        <h2 className={classes.searchText}>Search Spotify Playlist</h2>
        <SearchBar onSearch={handleSearch} />
        {error && <p className={classes.error}>{error}</p>}
      </div>
      <div className={classes.playlists}>
        {userPlaylists.map((playlist) => (
          <div onClick={() => setSelectedPlaylist(playlist)} key={playlist.id}>
            <PlaylistItem
              selectedPlaylistId={selectedPlaylist.id}
              id={playlist.id}
              name={playlist.name}
              totalTracks={playlist.tracks.total}
              image={playlist.images[0]?.url || 'defaultPlaylistImageURL'}
            />
          </div>
        ))}
      </div>
      {selectedPlaylist && (
        <div className={classes.confirmation}>
          <h1 className={classes.confirmationText}>Confirm selected playlist: {selectedPlaylist.name}</h1>
          <Link to={`/playlist/${selectedPlaylist.id}`}>
            <button className={classes.button}>Confirm</button>
          </Link>
        </div>
      )}
    </Suspense>
  );
};

export default SearchPage;
