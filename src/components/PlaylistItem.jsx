import classes from './PlaylistItem.module.css'

export default function PlaylistItem({name, totalTracks, image, selectedPlaylistId, id}) {
  return (
    <div className={selectedPlaylistId === id ? `${classes.playlistCard} ${classes.active}` : `${classes.playlistCard}`}>
      <li className={classes.content}>
        <h3 className={classes.title}>
          {name}
        </h3>
        <img src={image} className={classes.image}/>
        <p className={classes.title}>
          Songs: {totalTracks}
        </p>
      </li>
    </div>
  )
}
