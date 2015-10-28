import * as actions from './actions';
import Photo from './Photo';

import {
  branch as baobabBranch
} from 'baobab-react/decorators';
import React from 'react';

@baobabBranch({
  cursors: {
    guessId: ['guessId']
  }
})
export default class PhotoContainer extends React.Component {
  render() {
    const {guessId, id} = this.props;

    return (
      <Photo
        {...this.props}
        onClick={() => actions.markPhotoAsChosen(id)} />
    )
  }
}
