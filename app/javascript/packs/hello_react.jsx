// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import "./application.js"
import {Graph} from "../components/graph.jsx"

var DATA = [
  {name: 'Alex', value: 100, uuid: 'abc'},
  {name: 'Zeb', value: 150, uuid: 'def'}
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

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Hello name="React" />,
    document.body.appendChild(document.createElement('div')),
  )
})
