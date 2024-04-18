import { NavLink } from "react-router-dom"
import classes from './Home.module.css'
import { motion } from "framer-motion"

function HomePage() {
  return (
    <motion.div
    initial={{ y: -25, opacity: 0}}
    animate={{ y: 0, opacity: 1 }}
    transition={{
      ease: "linear",
      duration: 0.5
    }}>
    <header className={classes.homeContainer}>
      <h1>Select your favorite song from Spotify playlist.</h1>
      <nav>
        <ul>
          <motion.li whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 200 }}>
            <NavLink to="/search-user-playlist" className={classes.homeLink}>
              <h2>Search your own playlist</h2>
            </NavLink>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 200 }}>
            <NavLink to="/premade-playlists" className={classes.homeLink}>
              <h2 className={classes.premadeText}>Use our premade playlists</h2>
            </NavLink>
          </motion.li>
        </ul>
      </nav>
    </header>
    </motion.div>
  )
}

export default HomePage