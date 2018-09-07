import React, { Component } from 'react';

export class ScoreInput extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      score: 0
    };

    this.onClick = this.onClick.bind( this );
  }

  render() {
    return (
      <div
        onClick={ this.onClick }
        style={{
          height: '20px',
          border: '1px solid #222',
          backgroundColor: '#EEE'
        }}
        >
      </div>
    );
  }

  onClick( evt ) {
    const { onChange } = this.props;
    const { left, width } = evt.target.getBoundingClientRect();

    onChange( ( evt.clientX - left ) / width );
  }
}
