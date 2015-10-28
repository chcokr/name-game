import LESS from '!!less-interop!./App.less';

import {
  branch as baobabBranch
} from 'baobab-react/decorators';
import React from 'react';

const formatTimeElapsed = (elapsedMillisec) => {
  const min = parseInt(elapsedMillisec / 1000 / 60, 10);
  const sec = parseInt((elapsedMillisec - min * 1000 * 60) / 1000, 10);

  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
};

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
