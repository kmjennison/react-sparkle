/* eslint import/no-extraneous-dependencies: 0 */

import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'babel-polyfill'

// Initialize Enzyme
configure({ adapter: new Adapter() })
