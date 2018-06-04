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