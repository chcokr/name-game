import Baobab from 'baobab';

const state = new Baobab({
  chosenIdxs: [],
  data: {},
  displayHowManyPhotos: 4,
  displayedIdxs: [],
  guessId: -1,
  isMattMode: false,
  numCorrect: 0,
  numIncorrect: 0,
  roundStartMillisec: -1,
  timesElapsed: []
});

export default state;
