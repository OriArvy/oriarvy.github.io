import { NavLink } from 'react-router-dom';
import classes from './MainNavigation.module.css';

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/search-user-playlist"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Search Spotify
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/premade-playlists"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Premade Playlists
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
