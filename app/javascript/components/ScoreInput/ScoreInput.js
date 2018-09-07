import React, { Component } from 'react';

import styles from './ScoreInput.css';

export class ScoreInput extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      engaged: false,
      score: 0
    };

    this.onClick = this.onClick.bind( this );
    this.onMouseDown = this.onMouseDown.bind( this );
    this.onMouseUp = this.onMouseUp.bind( this );
    this.onMouseMove = this.onMouseMove.bind( this );
  }

  render() {
    const { labels: { min, max } = {} } = this.props;

    return (
      <div className={ styles.wrapper } onClick={ this.onClick } onMouseDown={ this.onMouseDown }>
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

  onMouseDown( evt ) {
    this.el = evt.target;
    this.setState({ engaged: true });
  }

  onMouseUp() {
    this.setState({ engaged: false });
  }

  onMouseMove( evt ) {
    if ( !this.state.engaged ) return;

    const { onChange } = this.props;

    const { left, width } = this.el.getBoundingClientRect();
    const score = ( evt.clientX - left ) / width;

    this.setState({ score });
    onChange( score );
  }

  componentDidMount() {
    const { onChange } = this.props;

    window.addEventListener( 'mousemove', this.onMouseMove );
    window.addEventListener( 'mouseup', this.onMouseUp );

    this.tick = setInterval( () => {
      onChange( this.state.score );
    }, 5 * 1000 );
  }

  componentWillUnmount() {
    this.tick.clear();
    this.tick = null;
  }
}
