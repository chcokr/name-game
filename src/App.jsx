import React from 'react';
import {
  Navbar
} from 'react-bootstrap';
import DocumentTitle from 'react-document-title';

export default class App extends React.Component {
  render() {
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
            Who is YJ Yang?
          </h1>

          <div
            style={{
              margin: '0 auto',
              padding: 20,
              width: '100%'
            }}>

            {Array(pickHowMany).fill().map(() =>
              <PhotoHolder
                size={`${100 / pickHowMany}%`} />)}

          </div>

        </div>
      </DocumentTitle>
    );
  }
}

class PhotoHolder extends React.Component {
  render() {
    const {size} = this.props;

    return (
      <div
        style={{
          background: 'black',
          border: '5px solid white',
          float: 'left',
          height: 100,
          width: size
        }}>
      </div>
    )
  }
}
