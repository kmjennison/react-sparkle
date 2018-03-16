/* eslint-env jest */

// Used in package.json Jest configuration
// and run before tests

import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'babel-polyfill'
import createContext2d from './mockCanvasContext2d'

// Initialize Enzyme
configure({ adapter: new Adapter() })

// Render a mock canvas element
const mockCanvas = () => {
  var doc = window.document
  var createElem = window.document.createElement

  // Override `createElement` when creating a canvas elem
  global.document.createElement = (elem) => {
    if (elem === 'canvas') {
      // Mock canvas
      const div = createElem.call(doc, 'div')
      div.getContext = createContext2d
      div.toDataUrl = jest.fn()
      return div
    } else {
      return createElem.call(doc, elem)
    }
  }
}

mockCanvas()
