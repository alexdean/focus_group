/* global App:false */
import { Component } from 'react';

export class SocketProvider extends Component {
  constructor( props ) {
    super( props );

    this.state = {};

    this.publish = this.publish.bind( this );
  }

  render() {
    return this.props.children({ ...this.state, publish: this.publish });
  }

  componentDidMount() {
    this.subscription = App.cable.subscriptions.create({ channel: "IssueChannel" }, {
      connected: function() {
        console.log('connected to IssueChannel')
      },

      disconnected: function() {
        console.log('disconnected from IssueChannel')
      },

      received: ( data ) => {
        this.setState( data );
      }
    });
  }

  publish( data ) {
    const { uuid } = this.props;

    console.log( 'Publish:', data );
    this.subscription.send({ uuid, ...data });
  }
}
