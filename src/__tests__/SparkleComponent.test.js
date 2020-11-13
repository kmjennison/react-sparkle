import React from 'react'
import { mount, shallow } from 'enzyme'

describe('SparkleComponent', () => {
  // eslint-disable-next-line jest/expect-expect
  it('mounts without error', () => {
    const Sparkle = require('../SparkleComponent').default
    mount(<Sparkle />)
  })

  it('logs a warning but does not throw an error if the HTML canvas ref is null', () => {
    const Sparkle = require('../SparkleComponent').default

    const mockConsoleWarn = jest
      .spyOn(console, 'warn')
      .mockImplementationOnce(() => {})

    // Shallow rendering means the canvas ref will be null
    shallow(<Sparkle />)

    expect(mockConsoleWarn).toHaveBeenCalledWith(
      'No sparkles today :( The canvas did not render.'
    )
  })
})
