import React from 'react'
import reactDom from 'react-dom'
import SocialApp from './App'

it('renders without crashing', () => {
  const div = document.createElement('div')
  reactDom.render(<SocialApp />, div)
  reactDom.unmountComponentAtNode(div)
})
