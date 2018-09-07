import React, { Component } from 'react';

import { UserForm } from '../UserForm';
import { ScoreInput } from '../ScoreInput';

export class Controls extends Component {
  constructor( props ) {
    super( props );

    this.state = {};
  }

  render() {
    const { publish } = this.props;
    const { name } = this.state;

    return (
      <div>
        { name
          ? (
            <div>
              <div>Welcome, <strong>{ name }</strong>. Share your input with the group.</div>
              <ScoreInput onChange={ score => publish({ name, value: score }) } />
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
