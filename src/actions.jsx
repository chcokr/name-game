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
      updateChoices(state.get('displayHowManyPhotos'));
    }, 1000);
  }
};

export const switchMattMode = () => {
  state.select('isMattMode').apply(b => !b);
};

export const updateChoices = () => {
  const data = state.get('data');
  const isMattMode = state.get('isMattMode');
  const pickHowMany = state.get('displayHowManyPhotos');

  let sampledData;
  if (!isMattMode) {
    const dataSize = Object.keys(data).length;
    sampledData = sample(range(dataSize), pickHowMany);
  } else {
    let mattIds = [];
    for (let key of Object.keys(data)) {
      if (data[key].name.indexOf('Mat') !== -1) {
        mattIds.push(data[key].id);
      }
    }
    sampledData = sample(mattIds, pickHowMany);
  }

  state.set('chosenIdxs', []);
  state.set('displayedIdxs', sampledData);
  state.set('guessId', sample(sampledData, 1)[0]);
  state.set('roundStartMillisec', Date.now());
};

export const updateData = (data) => {
  state.set('data', data);
};
