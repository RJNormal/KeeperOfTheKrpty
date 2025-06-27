import { csrfFetch } from './csrf';


const GET_ALL_NOTES = "characters/getAllNotes";
const CREATE_NOTE = "characters/createNote";
const DELETE_NOTE = "characters/deleteNote"
const UPDATE_NOTE = 'characters/updateNote';


export const getAllNotesAction = (data) => ({
    type: GET_ALL_NOTES,
    payload: data
});

export const createANoteAction = (note) => ({
    type: CREATE_NOTE,
    payload: note,
})

export const deleteNoteAction = (noteId) => ({
    type: DELETE_NOTE,
    payload: noteId
})
const updateNote = (note) => ({
    type: UPDATE_NOTE,
    payload: note,
  });

export const getAllNotesThunk = (characterId) => async (dispatch) => {
 
        const res = await csrfFetch(`/api/characters/${characterId}/notes`);
        if (res.ok) {
            const data = await res.json();
            dispatch(getAllNotesAction(data));
        } else {
            throw res;
        }
   
};

export const createNoteThunk = (characterId, note) => async (dispatch) => {
    const response = await csrfFetch(`/api/characters/${characterId}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            note: note.note  
        }),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(createANoteAction(data));
    } else {
        throw response;
    }
};

export const deleteNoteThunk = (characterId, noteId) => async (dispatch) => {
    const response = await csrfFetch(`/api/characters/${characterId}/notes/${noteId}`, {
      method: "DELETE",
    });
  
    if (response.ok) {
      dispatch(deleteNoteAction(noteId));
    } else {
      throw response;
    }
  };

  export const updateNoteThunk = (characterId, noteId, noteData) => async (dispatch) => {
    const res = await csrfFetch(`/api/characters/${characterId}/notes/${noteId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(noteData),
    });
  
    if (res.ok) {
      const updatedNote = await res.json();
      dispatch(updateNote(updatedNote));
      return updatedNote;
    } else {
      const errorData = await res.json();
      return errorData;
    }
  };
  

const initialState = {
    allNotes: [],
    byId: {},
};

const noteReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_NOTES: {
            const notesArr = action.payload.Notes;

            newState = { ...state };
            newState.allNotes = notesArr;
            let newByIdGetAllNotes = {};
            for (let note of notesArr) {
                newByIdGetAllNotes[note.id] = note;
            }
            newState.byId = newByIdGetAllNotes;
            return newState;
        }

        case CREATE_NOTE: {
            const newNote = action.payload;
            
            return {
                ...state,
                allNotes: [newNote, ...state.allNotes],
                byId: {
                    ...state.byId,
                    [newNote.id]: newNote,
                },
            };
        }
        case DELETE_NOTE: {
            const noteId = action.payload;
            const newState = { ...state };
            newState.allNotes = newState.allNotes.filter(note => note.id !== noteId);
            delete newState.byId[noteId];
            return newState;
          }

        case UPDATE_NOTE : {
            const updated = action.payload;
            return {
          ...state,
          allNotes: state.allNotes.map(note =>
            note.id === updated.id ? updated : note
          ),
          byId: {
            ...state.byId,
            [updated.id]: updated
          }
        };
    }

        default:
            return state;
    }
};

export default noteReducer;