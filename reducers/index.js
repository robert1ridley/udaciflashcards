import { FETCH_SETS, ADD_SET } from '../actions/flashcardSets'

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
    default :
      return state
  }
}

export default sets