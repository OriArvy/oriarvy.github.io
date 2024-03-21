import { NavLink } from "react-router-dom"
import classes from './Home.module.css'

function HomePage() {
  return (
    <>
    <header className={classes.homeContainer}>
      <h1>Select your favorite song from Spotify playlist.</h1>
      <nav>
        <ul>
          <li>
            <NavLink to="/search-user-playlist" className={classes.homeLink}>
              <h2>Search your own playlist</h2>
            </NavLink>
          </li>
          <li>
            <NavLink to="/premade-playlists" className={classes.homeLink}>
              <h2 className={classes.premadeText}>Use our premade playlists</h2>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
    </>
  )
}

export default HomePage