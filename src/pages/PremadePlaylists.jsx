import React from 'react';
import usePremadePlaylists from '../hooks/usePremadePlaylists';
import PlaylistItem from '../components/PlaylistItem';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import classes from './SearchUserPlaylist.module.css';


const PremadePlaylistsPage = () => {
  const playlistIds = useMemo(() => ['0ImbTL9gm01nStEsaCmj16', '5ABHKGoOzxkaa28ttQV9sE', '3FeewjLi5LMzIpV4h35QEz', '2L2HwKRvUgBv1YetudaRI3', '041EEjr8FMkWlzbuKnSXYD', '37i9dQZF1DX186v583rmzp', '2fnTFwiqrU1mwIVGb7hiVs', '37i9dQZF1DX3Kdv0IChEm9', '37i9dQZF1DX4WYpdgoIcn6', '6HaBsd2NrzZfyYYiV69diZ'], []);
  const [selectedPlaylist, setSelectedPlaylist] = useState('')
  const { playlists, loading, error } = usePremadePlaylists(playlistIds);

  if (loading) return <div className={classes.loading}>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={classes.playlists}>
      {playlists.map((playlist, index) => (
        <div key={index}>
          <div onClick={() => setSelectedPlaylist(playlist)} key={playlist.id}>
            <PlaylistItem
                selectedPlaylistId={selectedPlaylist.id}
                id={playlist.id}
                name={playlist.name}
                totalTracks={playlist.tracks.total}
                image={playlist.images[0]?.url || 'defaultPlaylistImageURL'}
              />
          </div>
        </div>
      ))}
      {selectedPlaylist && (
        <div className={classes.confirmation}>
          <h1 className={classes.confirmationText}>Confirm selected playlist: {selectedPlaylist.name}</h1>
          <Link to={`/playlist/${selectedPlaylist.id}`}>
            <button className={classes.button}>Confirm</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default PremadePlaylistsPage
