import { FETCH_SETS } from '../actions/flashcardSets'

function sets (state = {}, action) {
  switch (action.type) {
    case FETCH_SETS :
      return {
        ...state,
        ...action.sets,
      }
    default :
      return state
  }
}

export default sets