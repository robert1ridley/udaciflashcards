import { FETCH_SETS, ADD_SET, ADD_FLASHCARD } from '../actions/flashcardSets'

const initialState = {
  sets: []
};

function sets (state = initialState, action) {
  switch (action.type) {
    case FETCH_SETS :
      return {
        ...state,
        sets: action.sets
      }
    case ADD_SET :
      return {
        ...state,
        sets: [...state.sets, action.set]
      }
    case ADD_FLASHCARD :
      return {
        ...state,
        sets: [...state.sets.map((item) => ({...item,
          flashcards: item.id === action.setId ? item.flashcards.concat[action.flashcard] : item.flashcards}))]
      }
    default :
      return state
  }
}

export default sets