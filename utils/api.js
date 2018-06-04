import { AsyncStorage } from 'react-native';

export const FLASHCARD_SET_STORAGE_KEY = 'UdaciFlashcards:set'

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

// export function clearAll () {
//   return AsyncStorage.getItem(FLASHCARD_SET_STORAGE_KEY)
//     .then((results) => {
//       const data = JSON.parse(results)
//       data = undefined
//       delete data
//       AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
//     })
// }