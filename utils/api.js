import { AsyncStorage } from 'react-native';

export const FLASHCARD_SET_STORAGE_KEY = 'UdaciFlashcards:set';
export const QUIZ_RECORD_STORAGE_KEY = 'UdaciFlashcards:quizzes';

export function addFlashcardSet (set) {
  return AsyncStorage.mergeItem(FLASHCARD_SET_STORAGE_KEY, JSON.stringify({
    [set.setName]: set
  }))
}

export function fetchFlashcardSets () {
  return AsyncStorage.getItem(FLASHCARD_SET_STORAGE_KEY)
}

export function addFlashcardToSet (setName, flashcard) {
  return AsyncStorage.getItem(FLASHCARD_SET_STORAGE_KEY)
  .then((data) => JSON.parse(data))
  .then((json) => {
    json[setName].flashcards.push(flashcard)
    AsyncStorage.setItem(FLASHCARD_SET_STORAGE_KEY,JSON.stringify(json))
  })
}

export function fetchQuizzes (date) {
  return AsyncStorage.getItem(QUIZ_RECORD_STORAGE_KEY)
  .then((data) => JSON.parse(data))
  .then((data) => {
    console.log(data)
    if(data === null) {
      return false
    }
    else if(data.hasOwnProperty(date)){
      return true
    }
    else {
      return false
    }
  })
}

export function addQuizScore (date) {
  return AsyncStorage.mergeItem(QUIZ_RECORD_STORAGE_KEY, JSON.stringify({
    [date]: true
  }))
}


// export function clearAll () {
//   return AsyncStorage.getItem(FLASHCARD_SET_STORAGE_KEY)
//     .then((results) => {
//       const data = JSON.parse(results)
//       data = undefined
//       delete data
//       AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
//     })
// }