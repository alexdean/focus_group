/* global App:false */
import { Component } from 'react';

import makeSubject from 'callbag-subject';
import pipe from 'callbag-pipe';
import map from 'callbag-map';
import subscribe from 'callbag-subscribe';

export class SocketProvider extends Component {
  constructor( props ) {
    super( props );

    this.state = {};
    this.series = makeSubject();

    this.publish = this.publish.bind( this );
  }

  render() {
    return this.props.children({ ...this.state, publish: this.publish });
  }

  componentDidMount() {
    this.pipeline = pipe(
      this.series,
      sample( 500 ),
      map( ({ responses = [] }) => {
        if ( responses.length === 0 ) return 0;

        return responses.reduce( ( acc, { value }) => acc + value, 0 ) / responses.length;
      }),
      subscribe( average => {
        this.setState( ({ series = [] }) => {
          return {
            average,
            series: [
              ...series.slice( -60 ),
              average
            ]
          };
        });

        console.log( 'Pipeline:', average );
      })
    );

    this.subscription = App.cable.subscriptions.create({ channel: "IssueChannel" }, {
      connected: function() {
        console.log('connected to IssueChannel')
      },

      disconnected: function() {
        console.log('disconnected from IssueChannel')
      },

      received: ( data ) => {
        this.series( 1, data );
        this.setState( data );
      }
    });
  }

  publish( data ) {
    const { uuid } = this.props;

    // TODO: Insert throttling.
    this.subscription.send({ uuid, ...data });
  }
}

const sample = ( period = 1000 ) => source => ( start, sink ) => {
  let talkback;
  let latest;
  let interval;

  function receive( data ) {
    latest = data;

    if ( !interval ) {
      interval = setInterval( send, period );

      send();
    }
  }

  function send() {
    sink( 1, latest );
  }

  function terminate( err ) {
    clearInterval( interval );
    interval = null;

    // Send any pending data before terminating.
    send();
    sink( 2, err );
  }

  if ( start === 0 ) {
    source( 0, ( t, d ) => {
      if ( t === 0 ) talkback = d;
      if ( t === 1 ) receive( d );
      if ( t === 0 || t === 1 ) talkback( 1 );
      if ( t === 2 ) terminate( d );
    });

    sink( 0, ( t ) => {
      // Not pullable, so ignore t === 1.
      if ( t === 2 && talkback ) talkback( 2 );
    });
  }
}
