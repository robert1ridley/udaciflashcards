export const FETCH_SETS = 'FETCH_SETS';
export const ADD_SET = 'ADD_SET';
export const REMOVE_SET = 'REMOVE_SET';
export const ADD_FLASHCARD = 'ADD_FLASHCARD';
export const SET_QUIZ_QUESTIONS = 'SET_QUIZ_QUESTIONS';
export const GET_NEXT_QUESTION = 'GET_NEXT_QUESTION';
export const CORRECT_ANSWER = 'CORRECT_ANSWER';
export const QUIZ_COMPLETED = 'QUIZ_COMPLETED';
export const LOADED = 'LOADED';

export function fetchSets (sets) {
  return {
    type: FETCH_SETS,
    sets,
  }
}

export function addSet (set) {
  return {
    type: ADD_SET,
    set,
  }
}

export function removeSet (set) {
  return { 
    type: REMOVE_SET,
    set
  }
}

export function addFlashcard (setId, flashcard) {
  return {
    type: ADD_FLASHCARD,
    setId,
    flashcard
  }
}

export function setQuizQuestions (questions) {
  return {
    type: SET_QUIZ_QUESTIONS,
    questions
  }
}

export function loaded () {
  return {
    type: LOADED
  }
}

export const resetQuiz = async (questions) => {
  return dispatch => {
    dispatch(setQuizQuestions(questions))
    dispatch(loaded())
  }
}

export function correctAnswer () {
  return {
    type: CORRECT_ANSWER
  }
}

export function getNextQuestion () {
  return {
    type: GET_NEXT_QUESTION
  }
}

export function quizCompleted (date, data) {
  return {
    type: QUIZ_COMPLETED,
    date,
    data
  }
}