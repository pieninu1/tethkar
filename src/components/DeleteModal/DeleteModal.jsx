import Modal from "../Modal/Modal"
import Button from "../Button/Button"
import styles from "./DeleteModal.module.css"

const DeleteModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className={styles.content}>
        <p className={styles.message}>{message}</p>

        <div className={styles.actions}>
          <Button text="إلغاء" onClick={onClose} variant="secondary" />
          <Button text="حذف" onClick={onConfirm} variant="danger" />
        </div>
      </div>
    </Modal>
  )
}

export default DeleteModal