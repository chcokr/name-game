import state from './state';

import {
  range,
  sample
} from 'lodash';

export const markPhotoAsChosen = (photoId) => {
  state.select('chosenIdxs').push(photoId);
};

export const updateChoices = (pickHowMany) => {
  const dataSize = Object.keys(state.get('data')).length;

  const sampledData = sample(range(dataSize), pickHowMany);

  state.set('chosenIdxs', []);
  state.set('displayedIdxs', sampledData);
  state.set('guessId', sample(sampledData, 1)[0]);
};

export const updateData = (data) => {
  state.set('data', data);
};
