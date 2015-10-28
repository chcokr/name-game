import * as actions from './actions';
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

    actions.updateChoices(5);
  }
);

@baobabBranch({
  cursors: {
    chosenIdxs: ['chosenIdxs'],
    data: ['data'],
    displayedIdxs: ['displayedIdxs'],
    guessId: ['guessId']
  }
})
export default class App extends React.Component {
  render() {
    const {chosenIdxs, data, displayedIdxs, guessId} = this.props;

    if (displayedIdxs.length === 0) {
      // Data is not ready yet, so don't render anything for now.
      return null;
    }

    const displayedData = displayedIdxs.map(idx => data[idx]);

    const pickHowMany = 5;

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

          <div
            style={{
              height: 365,
              margin: '0 auto',
              padding: 20,
              width: '100%'
            }}>
            {displayedData.map((data, i) =>
              <PhotoContainer
                id={data.id}
                index={i}
                key={data.id}
                name={data.name}
                photoUrl={data.url}
                size={`${100 / pickHowMany}%`}
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
            If you have a keyboard, you can press 1-5 to make a choice.
          </div>

        </div>
      </DocumentTitle>
    );
  }
}
