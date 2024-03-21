import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/Home';
import SearchUserPlaylistLayout from './pages/SearchUserPlaylist';
import Bracket from './pages/Bracket';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import { loadPlaylistDetails } from './pages/PlaylistSettingsPage';
import PlaylistSettingsPage from './pages/PlaylistSettingsPage';
import PremadePlaylistsPage from './pages/PremadePlaylists';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
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
          { path: ':songCount', element: <Bracket />}
        ]
      }
    ],
  },
]);

const App = () => {
  return (
      <RouterProvider router={router} />
  )
};

export default App;
