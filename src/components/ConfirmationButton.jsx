import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import classes from './ConfirmationButton.module.css'

function ConfirmationButton({ playlist }) {
  return (
    <>
      <h1 className={classes.confirmationText}>
        Confirm selected playlist: {playlist.name}
      </h1>
      <Link to={`/playlist/${playlist.id}`}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 500 }}
          className={classes.button}
        >
          Confirm
        </motion.button>
      </Link>
    </>
  );
}

export default ConfirmationButton
