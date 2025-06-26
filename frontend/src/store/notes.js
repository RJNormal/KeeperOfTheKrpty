import { csrfFetch } from './csrf';


const GET_ALL_REVIEWS = "characters/getAllNotes";
const CREATE_REVIEW = "characters/createNote";
const DELETE_REVIEW = "characters/deleteNote"


export const getAllNotesAction = (data) => ({
    type: GET_ALL_REVIEWS,
    payload: data
});

export const createANoteAction = (note) => ({
    type: CREATE_REVIEW,
    payload: note,
})

export const deleteNoteAction = (noteId) => ({
    type: DELETE_REVIEW,
    payload: noteId
})

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
            body: JSON.stringify({
               note,
               characterId,
               userId: note.userId
            }),
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(createANoteAction(data));
        } else {
            throw response;
        }
    
};

export const deleteNoteThunk = (noteId) => async (dispatch) => {
      const response = await csrfFetch(`/api/notes/${noteId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        dispatch(deleteNoteAction(noteId));
      } else {
            throw response;
        }
    
  };
  
const initialState = {
    allNotes: [],
    byId: {},
};

const noteReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_REVIEWS: {
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

        case CREATE_REVIEW: {
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
        case DELETE_REVIEW: {
            const noteId = action.payload;
            const newState = { ...state };
            newState.allNotes = newState.allNotes.filter(note => note.id !== noteId);
            delete newState.byId[noteId];
            return newState;
          }

        default:
            return state;
    }
};

export default noteReducer;