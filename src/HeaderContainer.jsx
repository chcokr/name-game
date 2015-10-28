import * as actions from './actions';
import LESS from '!!less-interop!./App.less';
import {
  average,
  formatTimeElapsed
} from './util';

import {
  branch as baobabBranch
} from 'baobab-react/decorators';
import React from 'react';
import {
  Nav,
  Navbar,
  NavBrand,
  NavItem
} from 'react-bootstrap';

@baobabBranch({
  cursors: {
    isMattMode: ['isMattMode'],
    numCorrect: ['numCorrect'],
    numIncorrect: ['numIncorrect'],
    timesElapsed: ['timesElapsed']
  }
})
export default class HeaderContainer extends React.Component {
  render() {
    const {isMattMode, numCorrect, numIncorrect, timesElapsed} = this.props;

    return (
      <Navbar fluid>
        <NavBrand>
          Namegame!
        </NavBrand>

        <Nav right>
          <NavItem
            onClick={() => actions.switchMattMode()}>
            <input
              checked={isMattMode}
              type='checkbox' />{' '}
            Mat(t) mode
          </NavItem>
          <NavItem>
            <span
              style={{
                color: LESS.brandSuccess
              }}>
              Correct: <strong>{numCorrect}</strong>
            </span>
          </NavItem>
          <NavItem>
            <span
              style={{
                color: LESS.brandDanger
              }}>
              Wrong: <strong>{numIncorrect}</strong>
            </span>
          </NavItem>
          <NavItem>
            <span
              style={{
                color: LESS.brandInfo
              }}>
              Avg.time:&nbsp;
              <strong>{formatTimeElapsed(average(timesElapsed))}</strong>
            </span>
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
}
