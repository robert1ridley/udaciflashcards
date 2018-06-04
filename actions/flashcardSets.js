export const FETCH_SETS = 'FETCH_SETS';

export function fetchSets (sets) {
  return {
    type: FETCH_SETS,
    sets,
  }
}