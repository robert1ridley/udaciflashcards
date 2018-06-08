import { 
  FETCH_SETS, 
  ADD_SET, 
  ADD_FLASHCARD, 
  RESET_QUIZ, 
  SET_QUIZ_QUESTIONS, 
  GET_NEXT_QUESTION, 
  CORRECT_ANSWER,
  QUIZ_COMPLETED
} from '../actions/flashcardSets';

const initialState = {
  sets: [],
  questions: [],
  currentQuestionIndex: 0,
  correctAnswers: 0,
  numberOfQuestionsAsked: 0,
  quizForToday: false
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
        numberOfQuestionsAsked: 0,
        answerVisible: false
      }
    case SET_QUIZ_QUESTIONS :
      return {
        ...state,
        questions: action.questions,
        currentQuestionIndex: 0,
        correctAnswers: 0,
        numberOfQuestionsAsked: 0
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
        quizForToday: action.data 
      }
    default :
      return state
  }
}

export default sets