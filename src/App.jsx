import * as actions from './actions';
import PhotoContainer from './PhotoContainer';

import {
  branch as baobabBranch
} from 'baobab-react/decorators';
import {
  includes
} from 'lodash';
import React from 'react';
import {
  Navbar
} from 'react-bootstrap';
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

          <Navbar>
          </Navbar>

          <h1
            className="text-center"
            style={{
              paddingTop: 20
            }}>
            Who is {data[guessId].name}?
          </h1>

          <div
            style={{
              margin: '0 auto',
              padding: 20,
              width: '100%'
            }}>
            {displayedData.map((data, i) =>
              <PhotoContainer
                id={data.id}
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

        </div>
      </DocumentTitle>
    );
  }
}
