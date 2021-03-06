import React, { Component } from 'react';

import { UserForm } from '../UserForm';
import { ScoreInput } from '../ScoreInput';

export class Controls extends Component {
  constructor( props ) {
    super( props );

    this.state = {};
  }

  render() {
    const { prompt, labels, publish } = this.props;
    const { name } = this.state;

    return (
      <div>
        { name
          ? (
            <div>
              <div>Welcome, <strong>{ name }</strong>. { prompt || 'Your focus group is loading...' }</div>
              { prompt && (
                <ScoreInput labels={ labels } onChange={ score => publish({ name, value: score }) } />
              )}
            </div>
          )
          : (
            <UserForm onChange={ name => this.setState({ name }) } />
          )
        }
      </div>
    );
  }
}
