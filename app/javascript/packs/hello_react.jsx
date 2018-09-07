/* globals App:false */

// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { Fragment } from 'react';
import ReactDOM from 'react-dom'

import { SocketProvider } from '../components/SocketProvider';
import { Controls } from '../components/Controls';
import { Graph } from '../components/Graph'

const Hello = () => (
  <div>
    <h2>Focus Group</h2>
    <SocketProvider uuid={ App.uuid }>
      { ({ participants, publish }) => (
        <Fragment>
          <Controls publish={ publish } />
          <Graph data={ participants }/>
        </Fragment>
      )}
    </SocketProvider>
  </div>
)

// quick & dirty: re-execute ReactDOM.render every time i receive new data.
// move subscription into a react component.

// each jsx should be 1 widget. (a text input, etc.)
// each one is being pulled into the erb template.

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Hello />,
    document.body.appendChild(document.createElement('div')),
  )
})
