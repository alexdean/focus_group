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
    const { labels: { min, max } = {} } = this.props;

    return (
      <div className={ styles.wrapper } onClick={ this.onClick }>
        <div className={ styles.min }>{ min }</div>
        <div className={ styles.max }>{ max }</div>
        <div className={ styles.track }></div>
        <div className={ styles.knob } style={{ left: `${ this.state.score * 100 }%` }}></div>
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
