import LESS from '!!less-interop!./App.less';
import {
  formatTimeElapsed
} from './util';

import {
  branch as baobabBranch
} from 'baobab-react/decorators';
import React from 'react';

@baobabBranch({
  cursors: {
    roundStartMillisec: ['roundStartMillisec']
  }
})
export default class ClockContainer extends React.Component {
  state = {
    timeNow: Date.now()
  };

  render() {
    const {roundStartMillisec} = this.props;

    setTimeout(() => {
      this.setState({
        timeNow: Date.now()
      });
    }, 1000);

    return (
      <h3
        className='text-center'
        style={{
          color: LESS.brandInfo
        }}>
        {formatTimeElapsed(this.state.timeNow - roundStartMillisec)}
      </h3>
    )
  }
}
