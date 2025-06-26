import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotesThunk, deleteNoteThunk } from '../../store/notes';
import { useModal } from '../../context/Modal';
import CreateNoteModal from './CreateNoteModal'
import DeleteNoteModal from './DeleteNoteModal'
import { getCharacterByIdThunk } from '../../store/characters';
import "./CharacterDetails.css";

const CharacterDetail = () => {
    const { id } = useParams();
    const { setModalContent } = useModal(); 
    const dispatch = useDispatch();
    const character = useSelector(state => state.characters.byId[+id]);
    const notes = useSelector(state => state.notes.allNotes);
    const user = useSelector(state => state.session.user);
    const [loading, setLoading] = useState(true);
    const previewImage = character?.CharacterImages?.length > 0 ? character.CharacterImages[0]?.url : '';

    
useEffect(() => {
    if (id) {
      dispatch(getCharacterByIdThunk(id));
      dispatch(getAllNotesThunk(id));
    }
  }, [dispatch, id]);
    
    
    useEffect(() => {
        if (character && notes) {
            setLoading(false);
        }
    }, [character, notes]);
    
    if (loading) {
        return <p>Loading character details...</p>;
    }
    
    if (!character || !character.CharacterImages) {
        return <p>Loading character details...</p>;
    }
 
    
    const sortedNotes = notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const formatNoteDate = (date) => {
        const options = { year: 'numeric', month: 'long' };
        return new Date(date).toLocaleDateString(undefined, options);
    };
    const handleDeleteNote = (noteId) => {
        setModalContent(
            <DeleteNoteModal 
                noteId={noteId} 
                onConfirm={() => dispatch(deleteNoteThunk(noteId))} 
            />
        );
    };
    
    return (
        <div className="characterDetails">
            <h3>{character.name}</h3>
            <p>{character.city}, {character.state}, {character.country}</p>
            <div className="detailsImages">
                {previewImage && <img id="characterImage" src={previewImage} alt={character.name} />}
            </div>
            <div>
                {character.Owner && (
                    <p>Hosted by {character.Owner.firstName} {character.Owner.lastName}</p>
                )}
            </div>

            <div className='notesarea'>
                {user && (
                <button id='postnotebutton' onClick={() => setModalContent(<CreateNoteModal characterId={id} />)}>
                Post Your Note
            </button>
            
                )}

                {sortedNotes.length > 0 ? (
                    <div className="notesList">
                        {sortedNotes.map((note) => (
                            <div key={note.id} className="noteItem">
                                <p><strong>{note.User.firstName}</strong></p>
                                <p>{formatNoteDate(note.createdAt)}</p>
                                <p>{note.comment}</p>
                                {user && note.userId === user.id && (
                                    <button 
                                        onClick={() => handleDeleteNote(note.id)}
                                        className="deleteNoteButton"
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Take Your first Note!</p>
                )}
            </div>
        </div>
    );
};

export default CharacterDetail;