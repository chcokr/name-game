import state from './state';

import {
  range,
  sample
} from 'lodash';

export const markPhotoAsChosen = (photoId) => {
  state.select('chosenIdxs').push(photoId);

  const guessId = state.get('guessId');
  if (guessId !== photoId) {
    state.select('numIncorrect').apply(i => i + 1);
  } else {
    const roundStartMillisec = state.get('roundStartMillisec');
    state.select('timesElapsed').push(Date.now() - roundStartMillisec);
    state.select('numCorrect').apply(i => i + 1);
    setTimeout(() => {
      updateChoices(5);
    }, 1000);
  }
};

export const updateChoices = (pickHowMany) => {
  const dataSize = Object.keys(state.get('data')).length;

  const sampledData = sample(range(dataSize), pickHowMany);

  state.set('chosenIdxs', []);
  state.set('displayedIdxs', sampledData);
  state.set('guessId', sample(sampledData, 1)[0]);
  state.set('roundStartMillisec', Date.now());
};

export const updateData = (data) => {
  state.set('data', data);
};
