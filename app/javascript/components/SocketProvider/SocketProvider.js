/* global App:false */
import { Component } from 'react';

export class SocketProvider extends Component {
  constructor( props ) {
    super( props );

    this.state = {};
  }

  render() {
    return this.props.children( this.state );
  }

  componentDidMount() {
    this.subscription = App.cable.subscriptions.create({ channel: "IssueChannel" }, {
      connected: function() {
        console.log('connected to IssueChannel')
      },

      disconnected: function() {
        console.log('disconnected from IssueChannel')
      },

      received: ( participants ) => {
        this.setState({ participants });
      }
    });
  }
}
