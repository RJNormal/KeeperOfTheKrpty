import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotesThunk, deleteNoteThunk } from '../../store/notes';
import { useModal } from '../../context/Modal';
import CreateNoteModal from './CreateNoteModal';
import DeleteNoteModal from './DeleteNoteModal';
import EditNoteModal from './EditNoteModal';
import { getCharacterByIdThunk, deleteCharacterThunk } from '../../store/characters';
import "./CharacterDetails.css";

const CharacterDetail = () => {
    const { id } = useParams();
    const { setModalContent } = useModal();
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
                characterId={character.id}
                onConfirm={() => dispatch(deleteNoteThunk(id, noteId))}
            />
        );
    };

    const handleEditCharacter = () => {
        navigate(`/characters/${id}/edit`);
    };

    const handleDeleteCharacter = async () => {
        const confirm = window.confirm("Are you sure you want to delete this character?");
        if (confirm) {
            await dispatch(deleteCharacterThunk(id));
            navigate('/'); 
        }
    };

    return (
        <div className="characterDetails">
            <h3>{character.name}</h3>
            <p>{character.city}, {character.state}, {character.country}</p>

            <section className="characterBackstory">
  <h4>Backstory</h4>
  <p>{character.backstory}</p>
</section>

{user && user.id === character.ownerId && (
  <div className="characterActions">
    <button onClick={handleEditCharacter} className="editCharacterBtn">Edit Character</button>
    <button onClick={handleDeleteCharacter} className="deleteCharacterBtn">Delete Character</button>
  </div>
)}

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
                                <p>{note.note}</p>
                                {user && note.userId === user.id && (
                                    <>
                                      <button
                                        onClick={() => handleDeleteNote(note.id)}
                                        className="deleteNoteButton"
                                      >
                                        Delete
                                      </button>
                                      <button
                                        onClick={() => setModalContent(<EditNoteModal note={note} characterId={id} />)}
                                        className="editNoteButton"
                                      >
                                        Edit
                                      </button>
                                    </>
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