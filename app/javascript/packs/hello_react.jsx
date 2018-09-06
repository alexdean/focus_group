// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import "./application.js"
import {Graph} from "../components/graph.jsx"

var DATA = [
  {name: 'Alex'}
]

const Hello = props => (
  <div>
    <Graph data={DATA}/>
  </div>
)

Hello.defaultProps = {
  name: 'David'
}

Hello.propTypes = {
  name: PropTypes.string
}

// quick & dirty: re-execute ReactDOM.render every time i receive new data.
// move subscription into a react component.

// each jsx should be 1 widget. (a text input, etc.)
// each one is being pulled into the erb template.

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Hello name="React" />,
    document.body.appendChild(document.createElement('div')),
  )
})
