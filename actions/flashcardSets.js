export const FETCH_SETS = 'FETCH_SETS';
export const ADD_SET = 'ADD_SET';
export const ADD_FLASHCARD = 'ADD_FLASHCARD';
export const RESET_QUIZ = 'RESET_QUIZ';

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