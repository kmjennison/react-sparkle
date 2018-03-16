/* eslint-env jest */

import React from 'react'
import {
  shallow
} from 'enzyme'

describe('SparkleComponent', function () {
  it('logs a warning but does not throw an error if the HTML canvas ref is null', function () {
    const Sparkle = require('../SparkleComponent').default

    const mockConsoleWarn = jest.spyOn(console, 'warn')
      .mockImplementationOnce(() => {})

    // Shallow rendering means the canvas ref will be null
    shallow(<Sparkle />)

    expect(mockConsoleWarn).toHaveBeenCalledWith('No sparkles today :( The canvas did not render.')
  })
})
