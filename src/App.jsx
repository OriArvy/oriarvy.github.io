import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import HomePage from './pages/Home';
import SearchUserPlaylistLayout from './pages/SearchUserPlaylist';
import Bracket from './pages/Bracket';
import RootLayoutWithListener from './pages/RootLayoutWithListener';
import ErrorPage from './pages/Error';
import { loadPlaylistDetails } from './pages/PlaylistSettingsPage';
import PlaylistSettingsPage from './pages/PlaylistSettingsPage';
import PremadePlaylistsPage from './pages/PremadePlaylists';
import GuessSongPage from './pages/GuessSong';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayoutWithListener />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'search-user-playlist',
        element: <SearchUserPlaylistLayout />,
      },
      {
        path: 'premade-playlists',
        element: <PremadePlaylistsPage />,
      },
      {
        path: 'playlist/:playlistId',
        id: 'playlist-details',
        loader: loadPlaylistDetails,
        children: [
          {
            index: true,
            element: <PlaylistSettingsPage />
          },
          { path: ':songCount', element: <Bracket />},
          { path: 'guess-the-song', element: <GuessSongPage /> }
        ]
      }
    ],
  },
]);

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const path = urlParams.get('path');
    if (path) {
      navigate(path);
    }
  }, [navigate]);
  
  return (
      <RouterProvider router={router} />
  )
};

export default App;
