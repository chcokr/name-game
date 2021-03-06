import * as actions from './actions';
import ClockContainer from './ClockContainer';
import HeaderContainer from './HeaderContainer';
import LESS from '!!less-interop!./App.less';
import './keyboard';
import PhotoContainer from './PhotoContainer';

import {
  branch as baobabBranch
} from 'baobab-react/decorators';
import {
  includes
} from 'lodash';
import React from 'react';
import DocumentTitle from 'react-document-title';
import request from 'xhr-request';

const normalizeData = (arr) => {
  let rtn = {};

  for (let i = 0; i < arr.length; i += 1) {
    rtn[i] = {
      id: i,
      ...arr[i]
    };
  }

  return rtn;
};

request(
  'http://api.namegame.willowtreemobile.com',
  {json: true},
  (err, res) => {
    if (err) {
      throw err;
    }

    actions.updateData(normalizeData(res));

    actions.updateChoices();
  }
);

@baobabBranch({
  cursors: {
    chosenIdxs: ['chosenIdxs'],
    data: ['data'],
    displayHowManyPhotos: ['displayHowManyPhotos'],
    displayedIdxs: ['displayedIdxs'],
    guessId: ['guessId']
  }
})
export default class App extends React.Component {
  render() {
    const {chosenIdxs, data, displayHowManyPhotos,
      displayedIdxs, guessId} = this.props;

    if (displayedIdxs.length === 0) {
      // Data is not ready yet, so don't render anything for now.
      return null;
    }

    const displayedData = displayedIdxs.map(idx => data[idx]);

    return (
      <DocumentTitle title="Namegame!">
        <div>

          <HeaderContainer />

          <h1
            className="text-center"
            style={{
              paddingTop: 20
            }}>
            Who is {data[guessId].name}?
          </h1>
          <ClockContainer />

          <div
            style={{
              margin: '0 auto',
              overflow: 'auto',
              padding: '0 20px 30px 20px',
              width: '100%'
            }}>
            {displayedData.map((data, i) =>
              <PhotoContainer
                id={data.id}
                index={i}
                key={data.id}
                name={data.name}
                photoUrl={data.url}
                size={`${100 / displayHowManyPhotos}%`}
                status={(() => {
                  if (!includes(chosenIdxs, data.id)) {
                    return 'not-chosen';
                  }
                  if (guessId === data.id) {
                    return 'correct';
                  }
                  return 'incorrect';
                })()} />)}
          </div>

          <div
            className='text-center'
            style={{
              color: LESS.grayLight
            }}>
            If you have a keyboard, you can press 1-{displayHowManyPhotos} to
            make a choice.
          </div>

        </div>
      </DocumentTitle>
    );
  }
}
