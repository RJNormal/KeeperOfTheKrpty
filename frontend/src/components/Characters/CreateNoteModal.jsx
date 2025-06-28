import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNoteThunk } from '../../store/notes';
import { useModal } from '../../context/Modal';


const CreateNoteModal = ({ characterId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [note, setNoteText] = useState("");  

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const noteData = {
          note: note.trim(),
        };
      
        await dispatch(createNoteThunk(characterId, noteData));
        closeModal();
      };

    return (
        <div className="postnotemodal">
            <h2>What Happened Today?</h2>
            <input id='noteinput'
                value={note}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Write your note here..."
            />
            <button id='submitnote' onClick={handleSubmit}>
                Submit Your Note
            </button>
        </div>
    );
};

export default CreateNoteModal;