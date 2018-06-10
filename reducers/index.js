import { 
  FETCH_SETS, 
  ADD_SET, 
  ADD_FLASHCARD, 
  SET_QUIZ_QUESTIONS, 
  GET_NEXT_QUESTION, 
  CORRECT_ANSWER,
  QUIZ_COMPLETED,
  LOADED
} from '../actions/flashcardSets';

const initialState = {
  sets: [],
  questions: [],
  currentQuestionIndex: 0,
  correctAnswers: 0,
  numberOfQuestionsAsked: 0,
  quizForToday: {},
  quizReset: true,
  loaded: false
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
    case SET_QUIZ_QUESTIONS :
      return {
        ...state,
        questions: action.questions,
        currentQuestionIndex: 0,
        correctAnswers: 0,
        numberOfQuestionsAsked: 0,
        loaded: false
      }
    case GET_NEXT_QUESTION :
      return {
        ...state,
        currentQuestionIndex:  state.questions.length-1 === state.currentQuestionIndex ? state.currentQuestionIndex : state.currentQuestionIndex  + 1,
        numberOfQuestionsAsked: state.numberOfQuestionsAsked + 1
      }
    case CORRECT_ANSWER :
      return {
        ...state,
        correctAnswers: state.correctAnswers + 1,
        currentQuestionIndex:  state.questions.length-1 === state.currentQuestionIndex ? state.currentQuestionIndex : state.currentQuestionIndex  + 1,
        numberOfQuestionsAsked: state.numberOfQuestionsAsked + 1
      }
    case QUIZ_COMPLETED :
      return {
        ...state,
        quizForToday: {
          [action.date]: action.data
        }
      }
    case LOADED :
      return {
        ...state,
        loaded: true
      }
    default :
      return state
  }
}

export default sets