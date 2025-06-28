import { csrfFetch } from './csrf';


const GET_ALL_CHARACTERS = "characters/getAll";
const GET_ONE_CHARACTER = 'characters/getOne';
const CREATE_CHARACTER = "characters/create";
const UPDATE_CHARACTER = "characters/update";
const DELETE_CHARACTER = "characters/delete";


export const getAllCharactersAction = (data) => ({
  type: GET_ALL_CHARACTERS,
  payload: data,
});

export const getCharacterByIdAction = (character) => ({
    type: GET_ONE_CHARACTER,
    payload: character,
  });

export const createCharacterAction = (character) => ({
  type: CREATE_CHARACTER,
  payload: character,
});

export const updateCharacterAction = (character) => ({
  type: UPDATE_CHARACTER,
  payload: character,
});

export const deleteCharacterAction = (characterId) => ({
  type: DELETE_CHARACTER,
  payload: characterId,
});

export const getAllCharactersThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/characters/current');
    if (res.ok) {
      const data = await res.json();
      dispatch(getAllCharactersAction(data));
    } else {
      throw res;
    }
  };

  export const getCharacterByIdThunk = (characterId) => async (dispatch) => {
    const res = await csrfFetch(`/api/characters/${characterId}`);
    if (res.ok) {
      const data = await res.json();
      dispatch(getCharacterByIdAction(data));
      return data;
    } else {
      throw res;
    }
  };

export const createCharacter = (character, imageUrls = []) => async (dispatch) => {
const { name,race,className,backstory, userId, } = character;

    const response = await csrfFetch("/api/characters", {
        method: "POST",
        body: JSON.stringify({
            name,
            race,
            className,
            backstory, 
            userId,
        }),
    });

    if (response.ok) {
        const data = await response.json();
        const characterWithImages = { ...data, CharacterImages: [] };

        if (imageUrls.length > 0) {
            for (let i = 0; i < imageUrls.length; i++) {
                const imageResponse = await csrfFetch(`/api/characters/${data.id}/images`, {
                    method: "POST",
                    body: JSON.stringify({
                        url: imageUrls[i],
                        preview: i === 0,
                    }),
                });

                if (imageResponse.ok) {
                    const imageData = await imageResponse.json();
                    characterWithImages.CharacterImages.push(imageData);
                }
            }
        }
        dispatch(createCharacterAction(characterWithImages));

        return characterWithImages;
    }

};

export const updateCharacterThunk = (characterId, characterData, imageUrls) => async (dispatch) => {

    const response = await csrfFetch(`/api/characters/${characterId}`, {
        method: "PUT",
        body: JSON.stringify({ ...characterData, imageUrls }),
    });


    const updatedCharacter = await response.json();
    updatedCharacter.CharacterImages = imageUrls.map(url => ({ url })); 
    dispatch({
        type: 'UPDATE_CHARACTER',
        payload: updatedCharacter,
    });

    return updatedCharacter;

};

export const deleteCharacterThunk = (characterId) => async (dispatch) => {

    const response = await csrfFetch(`/api/characters/${characterId}`, { method: "DELETE" });

    if (response.ok) {
        dispatch(deleteCharacterAction(characterId));
        dispatch(getAllCharactersThunk());
    }

};


const initialState = {
allCharacters: [],
byId: {},
};

const characterReducer = (state = initialState, action) => {
let newState;
switch (action.type) {
    case GET_ALL_CHARACTERS: {
        const charactersArr = action.payload.Characters;

        newState = { ...state };
        newState.allCharacters = charactersArr;
        let newByIdGetAllCharacters = {};
        for (let character of charactersArr) {
            newByIdGetAllCharacters[character.id] = character;
        }
        newState.byId = newByIdGetAllCharacters;
        return newState;
    }

    case GET_ONE_CHARACTER: {
        const character = action.payload;
        return {
          ...state,
          byId: {
            ...state.byId,
            [character.id]: character,
          },
        };
      }
    case CREATE_CHARACTER: {
        const newCharacter = action.payload;
        return {
            ...state,
            allCharacters: [...state.allCharacters, newCharacter],
            byId: { ...state.byId, [newCharacter.id]: newCharacter },
        };
    }
    case DELETE_CHARACTER: {
      const newAllCharacters = state.allCharacters?.filter(
        (char) => char.id !== action.payload
      ) || [];
    
      const newById = { ...(state.byId || {}) };
      delete newById[action.payload];
    
      return {
        ...state,
        allCharacters: newAllCharacters,
        byId: newById,
      };
    }
    case UPDATE_CHARACTER: {
        const updatedCharacter = action.payload;
        const updatedCharacters = state.allCharacters.map(character =>
            character.id === updatedCharacter.id ? updatedCharacter : character
        );

        return {
            ...state,
            allCharacters: updatedCharacters,
            byId: {
                ...state.byId,
                [updatedCharacter.id]: updatedCharacter,
            },
        };
    }

    default:
        return state;
}
};

export default characterReducer;