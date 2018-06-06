export const FETCH_SETS = 'FETCH_SETS';
export const ADD_SET = 'ADD_SET';
export const ADD_FLASHCARD = 'ADD_FLASHCARD';
export const RESET_QUIZ = 'RESET_QUIZ';
export const SET_QUIZ_QUESTIONS = 'SET_QUIZ_QUESTIONS';
export const GET_NEXT_QUESTION = 'GET_NEXT_QUESTION';
export const CORRECT_ANSWER = 'CORRECT_ANSWER';

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

export function addFlashcard (setId, flashcard) {
  return {
    type: ADD_FLASHCARD,
    setId,
    flashcard
  }
}

export function resetQuiz () {
  return {
    type: RESET_QUIZ
  }
}

export function setQuizQuestions (questions) {
  return {
    type: SET_QUIZ_QUESTIONS,
    questions
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