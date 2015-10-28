import Baobab from 'baobab';

const state = new Baobab({
  chosenIdxs: [],
  data: {},
  displayedIdxs: [],
  guessId: -1,
  numCorrect: 0,
  numIncorrect: 0,
  roundStartMillisec: -1
});

export default state;
