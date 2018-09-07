import React, { Component } from 'react';

import styles from './ScoreInput.css';

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
        className={ styles.wrapper }
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

    this.setState({ score: ( evt.clientX - left ) / width });
    onChange( ( evt.clientX - left ) / width );
  }

  componentDidMount() {
    const { onChange } = this.props;

    this.tick = setInterval( () => {
      onChange( this.state.score );
    }, 5 * 1000 );
  }

  componentWillUnmount() {
    this.tick.clear();
    this.tick = null;
  }
}
