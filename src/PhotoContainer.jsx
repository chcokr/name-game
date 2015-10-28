import * as actions from './actions';
import Photo from './Photo';

import {
  branch as baobabBranch
} from 'baobab-react/decorators';
import React from 'react';

export default class PhotoContainer extends React.Component {
  render() {
    const {id} = this.props;

    return (
      <Photo
        {...this.props}
        onClick={() => actions.markPhotoAsChosen(id)} />
    )
  }
}
