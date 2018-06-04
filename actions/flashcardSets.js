export const FETCH_SETS = 'FETCH_SETS';
export const ADD_SET = 'ADD_SET';

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