import React from 'react'
import { render } from '@testing-library/react'

describe('SparkleComponent', () => {
  // eslint-disable-next-line jest/expect-expect
  it('renders without error', () => {
    const Sparkle = require('../SparkleComponent').default
    render(<Sparkle />)
  })
})
