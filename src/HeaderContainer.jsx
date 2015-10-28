import LESS from '!!less-interop!./App.less';

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
    numCorrect: ['numCorrect'],
    numIncorrect: ['numIncorrect']
  }
})
export default class HeaderContainer extends React.Component {
  render() {
    const {numCorrect, numIncorrect} = this.props;

    return (
      <Navbar fluid>
        <NavBrand>
          Namegame!
        </NavBrand>

        <Nav right>
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
        </Nav>
      </Navbar>
    )
  }
}
