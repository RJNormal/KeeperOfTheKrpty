import { useModal } from '../../context/Modal';

const DeleteNoteModal = ({ onConfirm }) => {  
    const { closeModal } = useModal();
  
    const handleDelete = async () => {
      await onConfirm();
      closeModal();
    };
  
    return (
      <div className="deleteNoteModal">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this note?</p>
        <button id='deletebutton' onClick={handleDelete} className="confirmDeleteBtn">Yes (Delete Note)</button>
        <button id='canceldelbutton' onClick={closeModal} className="cancelDeleteBtn">No (Keep Note)</button>
      </div>
    );
  };
export default DeleteNoteModal;