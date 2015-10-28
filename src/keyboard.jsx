import * as actions from './actions';
import state from './state';

document.addEventListener('keypress', e => {
  const numPressed = e.charCode - '0'.charCodeAt(0);

  if (1 <= numPressed && numPressed <= state.get('displayHowManyPhotos')) {
    const displayedIdxs = state.get('displayedIdxs');

    const idChosen = displayedIdxs[numPressed - 1];

    actions.markPhotoAsChosen(idChosen);
  }
});
