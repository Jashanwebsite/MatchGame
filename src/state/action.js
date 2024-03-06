// actions.js
export const First = 'First';
export const Second = 'Second';

export const first = (data) => ({
  type: First,
  data:data
});

export const second = (data) => ({
  type: Second,
  data:data
});
export const updateTimerAction = (newTimerValue) => ({
  type: 'UPDATE_TIMER',
  payload: newTimerValue,
});
export const updateScoreAction = (Score) => ({
  type: 'Score',
  payload: Score,
});
export const resetscore = (Score) => ({
  type: 'resetscore',
  payload: Score,
});