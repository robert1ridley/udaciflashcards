import { FETCH_SETS, ADD_SET, ADD_FLASHCARD, RESET_QUIZ, SET_QUIZ_QUESTIONS, GET_NEXT_QUESTION } from '../actions/flashcardSets'

const initialState = {
  sets: [],
  questions: [],
  currentQuestionIndex: 0,
  correctAnswers: 0
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
    case SET_QUIZ_QUESTIONS :
      return {
        ...state,
        questions: action.questions,
        currentQuestionIndex: 0,
        correctAnswers: 0
      }
    case GET_NEXT_QUESTION :
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1
      }    
    default :
      return state
  }
}

export default sets