import classes from './Modal.module.css'
import { motion } from 'framer-motion'

const Modal = ({ children, isOpen, onClose }) => {
  return (
    isOpen && (
      <motion.div
        className={classes.modal}
        initial={{ y: -25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          ease: 'linear',
          duration: 0.5}} 
      >
        <div className={classes.modalOverlay} onClick={onClose}>
          <div className={classes.modalContent} onClick={e => e.stopPropagation()}>
            <div className={classes.modalClose}>
              <motion.button whileHover={{ scale: 1.1 }} className={classes.cancelButton} onClick={onClose}>Cancel</motion.button>
            </div>
            {children}
          </div>
        </div>
      </motion.div>
    )
  )
}

export default Modal
