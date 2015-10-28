import LESS from '!!less-interop!./App.less';

import React from 'react';

export default class Photo extends React.Component {
  render() {
    const {index, name, photoUrl, size, status} = this.props;

    let overlayColor;
    switch (status) {
    case 'correct':
      overlayColor = LESS.brandSuccess;
      break;
    case 'incorrect':
      overlayColor = LESS.brandDanger;
      break;
    case 'not-chosen':
      overlayColor = 'transparent';
      break;
    default:
      throw new Error('Invalid status for Photo component');
    }

    const overlay = (
      <div>
        <div
          style={{
            background: overlayColor,
            height: '100%',
            left: 0,
            opacity: 0.5,
            position: 'absolute',
            top: 0,
            width: '100%'
          }}>
        </div>
        <h2
          className='text-center'
          style={{
            bottom: 10,
            color: '#fff',
            position: 'absolute',
            width: '100%'
          }}>
          {name}
        </h2>
      </div>
    );

    return (
      <div
        {...this.props}
        style={{
          border: '5px solid white',
          cursor: 'pointer',
          float: 'left',
          position: 'relative',
          width: size
        }}>
        <h2
          className='text-center'
          style={{
            marginTop: 5,
            width: '100%'
          }}>
          {index + 1}
        </h2>
        {status !== 'not-chosen' && overlay}
        <img
          src={photoUrl}
          style={{
            width: '100%'
          }} />
      </div>
    );
  }
}
