import { AsyncStorage } from 'react-native';

export const FLASHCARD_SET_STORAGE_KEY = 'UdaciFlashcards:set';
export const QUIZ_RECORD_STORAGE_KEY = 'UdaciFlashcards:quizzes';
export const NOTIFICATION_KEY = 'Udaciflashcards:notification';

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

export function deleteSingleFlashcard(setName, flashcard) {
  return AsyncStorage.getItem(FLASHCARD_SET_STORAGE_KEY)
  .then((data) => JSON.parse(data))
  .then((json) => {
    const updatedFlashcards = json[setName].flashcards.filter(item => item.id !== flashcard.id)
    json[setName].flashcards.splice(0, json[setName].flashcards.length);
    for(var i = 0; i<updatedFlashcards.length; i++) {
      json[setName].flashcards.push(updatedFlashcards[i]);
    }
    console.log(json[setName].flashcards)
    AsyncStorage.setItem(FLASHCARD_SET_STORAGE_KEY,JSON.stringify(json))
  })
}

export function deleteSet (setName) {
  return AsyncStorage.getItem(FLASHCARD_SET_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[setName] = undefined
      delete data[setName]
      AsyncStorage.setItem(FLASHCARD_SET_STORAGE_KEY, JSON.stringify(data))
    })
}

export function fetchQuizzes (date) {
  return AsyncStorage.getItem(QUIZ_RECORD_STORAGE_KEY)
  .then((data) => JSON.parse(data))
  .then((data) => {
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

const keys = [FLASHCARD_SET_STORAGE_KEY, QUIZ_RECORD_STORAGE_KEY, NOTIFICATION_KEY]

export function clearAll () {
  return AsyncStorage.multiRemove(keys, (err) => {
    if(err){
      console.log(err)
    }
  });
}
