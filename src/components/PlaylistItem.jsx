import classes from './PlaylistItem.module.css'
import { motion } from 'framer-motion'

export default function PlaylistItem({name, totalTracks, image, selectedPlaylistId, id}) {
  return (
    <motion.div  whileHover={{ scale: 1.1 }} className={selectedPlaylistId === id ? `${classes.playlistCard} ${classes.active}` : `${classes.playlistCard}`}>
      <li className={classes.content}>
        <h3 className={classes.title}>
          {name}
        </h3>
        <img src={image} className={classes.image}/>
        <p className={classes.title}>
          Songs: {totalTracks}
        </p>
      </li>
    </motion.div>
  )
}
