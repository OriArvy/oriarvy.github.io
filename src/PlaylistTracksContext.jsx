import React, { createContext, useContext, useState } from 'react';

const PlaylistTracksContext = createContext();

export const PlaylistTracksProvider = ({ children }) => {
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const setTracks = (tracks) => {
    setPlaylistTracks(tracks);
  };

  return (
    <PlaylistTracksContext.Provider value={{ playlistTracks, setTracks }}>
      {children}
    </PlaylistTracksContext.Provider>
  );
};

export const usePlaylistContext = () => {
  return useContext(PlaylistTracksContext);
};