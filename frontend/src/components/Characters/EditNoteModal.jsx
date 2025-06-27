import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateNoteThunk } from '../../store/notes';
import { useModal } from '../../context/Modal';

const EditNoteModal = ({ note, characterId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [noteText, setNoteText] = useState(note.note || '');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedNote = {
      note: noteText,
    };

    const res = await dispatch(updateNoteThunk(characterId, note.id, updatedNote));

    if (res && res.errors) {
      setErrors(res.errors);
    } else {
      closeModal();
    }
  };

  return (
    <div className="editNoteModal">
      <h2>Edit Note</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          rows={5}
        />
        {errors.length > 0 && (
          <ul>
            {errors.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        )}
        <button type="submit">Update Note</button>
        <button type="button" onClick={closeModal}>Cancel</button>
      </form>
    </div>
  );
};

export default EditNoteModal;