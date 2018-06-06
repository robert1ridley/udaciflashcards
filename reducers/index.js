import { FETCH_SETS, ADD_SET, ADD_FLASHCARD, RESET_QUIZ } from '../actions/flashcardSets'

const initialState = {
  sets: [],
  questions: [],
  currentQuestionIndex: 0,
  correctAnswers: 0,
  answerVisible: false
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
          flashcards: item.id === action.setId ? item.flashcards.concat([action.flashcard]) : item.flashcards}))]
      }
    case RESET_QUIZ :
      return {
        ...state,
        questions: [],
        currentQuestionIndex: 0,
        correctAnswers: 0,
        answerVisible: false
      }
    default :
      return state
  }
}

export default sets