/* globals Image */

import React from 'react'
import PropTypes from 'prop-types'

const spriteSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAHCAYAAAD5wDa1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozNDNFMzM5REEyMkUxMUUzOEE3NEI3Q0U1QUIzMTc4NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozNDNFMzM5RUEyMkUxMUUzOEE3NEI3Q0U1QUIzMTc4NiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjM0M0UzMzlCQTIyRTExRTM4QTc0QjdDRTVBQjMxNzg2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjM0M0UzMzlDQTIyRTExRTM4QTc0QjdDRTVBQjMxNzg2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+jzOsUQAAANhJREFUeNqsks0KhCAUhW/Sz6pFSc1AD9HL+OBFbdsVOKWLajH9EE7GFBEjOMxcUNHD8dxPBCEE/DKyLGMqraoqcd4j0ChpUmlBEGCFRBzH2dbj5JycJAn90CEpy1J2SK4apVSM4yiKonhePYwxMU2TaJrm8BpykpWmKQ3D8FbX9SOO4/tOhDEG0zRhGAZo2xaiKDLyPGeSyPM8sCxr868+WC/mvu9j13XBtm1ACME8z7AsC/R9r0fGOf+arOu6jUwS7l6tT/B+xo+aDFRo5BykHfav3/gSYAAtIdQ1IT0puAAAAABJRU5ErkJggg=='
const spriteCoords = [0, 6, 13, 20]

// Create sprite
const sprite = new Image()
sprite.src = spriteSrc

const flickerSpeedConstants = {
  slowest: 50,
  slower: 20,
  slow: 12,
  normal: 7,
  fast: 4,
  faster: 2,
  fastest: 0
}

// Inspired by and drawn from:
// https://github.com/simeydotme/jQuery-canvas-sparkles
class Sparkle extends React.Component {
  constructor (props) {
    super(props)
    this.sparkleWrapper = null
    this.canvas = null
    this.context = null
    this.sparkles = []
    this.animationFrame = null
  }

  componentDidMount () {
    this.init()
  }

  componentWillUnmount () {
    this.end()
  }

  init () {
    this.context = this.canvas.getContext('2d')
    this.sizeCanvas()
    this.start()
  }

  start () {
    this.createSparkles()
    this.drawSparkles()
    this.updateSparkles()
  }

  end () {
    window.cancelAnimationFrame(this.animationFrame)
    this.sparkles = []
  }

  sizeCanvas () {
    const { overflowPx } = this.props

    // Get dimensions of parent container
    const parentNode = this.sparkleWrapper.parentNode
    const parentWidth = parentNode.clientWidth
    const parentHeight = parentNode.clientHeight

    // Size the canvas
    this.canvas.width = parentWidth + 2 * overflowPx
    this.canvas.height = parentHeight + 2 * overflowPx
  }

  randomSparkleSize () {
    const { minSize, maxSize } = this.props
    return Math.floor(Math.random() * (maxSize - minSize + 1) + minSize)
  }

  getColor () {
    return '#FFF' // TODO
  }

  getOpacity () {
    return Math.random()
  }

  // Returns a value from spriteCoords, determining which slice of
  // the sprite we display
  getSpriteVariant () {
    return spriteCoords[Math.floor(Math.random() * spriteCoords.length)]
  }

  // Assigns fresh values to an existing sparkle
  recreateSparkle (existingSparkle) {
    return Object.assign(existingSparkle, {
      position: {
        x: Math.floor(Math.random() * this.canvas.width),
        y: Math.floor(Math.random() * this.canvas.height)
      },
      size: this.randomSparkleSize(),
      opacity: this.getOpacity(),
      color: this.getColor(),
      variant: this.getSpriteVariant()
    })
  }

  createSparkle () {
    return this.recreateSparkle({})
  }

  createSparkles () {
    const { count } = this.props

    // Create `this.props.count` number of sparkles
    for (var i = 0; i < count; i++) {
      this.sparkles.push(this.createSparkle())
    }
  }

  drawSparkles () {
    if (!this.canvas || !this.context) {
      return
    }

    // Clear canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    const self = this

    // Draw each sparkle
    this.sparkles.forEach((sparkle) => {
      self.context.save()
      self.context.globalAlpha = sparkle.opacity
      self.context.drawImage(
        sprite,
        sparkle.variant, // show different sparkle styles
        0, 7, 7,
        sparkle.position.x,
        sparkle.position.y,
        sparkle.size, sparkle.size
      )

      // Tint with the color
      if (sparkle.color) {
        self.context.globalCompositeOperation = 'source-atop'
        self.context.globalAlpha = 0.6
        self.context.fillStyle = sparkle.color
        self.context.fillRect(sparkle.position.x, sparkle.position.y, 7, 7)
      }

      self.context.restore()
    })
  }

  updateSparkles () {
    const { flicker, flickerSpeed } = this.props
    const self = this
    this.animationFrame = window.requestAnimationFrame(time => {
      // Integer of current time. Useful for events that we want to do
      // less frequently than any animation frame.
      const currentTimeInt = Math.floor(time)

      // Update sparkles by doing some or all of the following:
      //  - change opacity
      //  - change position
      //  - change sprite slice to add "flicker" effect
      this.sparkles.forEach((sparkle) => {
        sparkle.opacity -= 0.005

        // Sometimes change the sparkle variant for a "flicker" effect
        if (flicker) {
          const flickerSpeedConstant = flickerSpeedConstants[flickerSpeed]
          if (currentTimeInt % Math.floor((Math.random() * flickerSpeedConstant) + 1) === 0) {
            sparkle.variant = self.getSpriteVariant()
          }
        }

        // Sparkle has faded out, so let's replace it with a
        // new one
        // TODO: fade in new sparkles
        if (sparkle.opacity < 0) {
          this.recreateSparkle(sparkle)
        }

        // TODO: flicker
        // TODO: change position
      })

      // Draw the updated sparkles
      self.drawSparkles()

      // Continue to update sparkles
      self.updateSparkles()
    })
  }

  render () {
    const { overflowPx } = this.props
    return (
      <span
        ref={(sparkleWrapper) => {
          this.sparkleWrapper = sparkleWrapper
        }}
        style={{
          width: '100%',
          height: '100%',
          overflow: 'visible',
          position: 'absolute',
          top: `-${overflowPx}px`,
          left: `-${overflowPx}px`
        }}
      >
        <canvas
          ref={(canvas) => {
            this.canvas = canvas
          }}
        />
      </span>
    )
  }
}

Sparkle.propTypes = {
  // TODO
}

Sparkle.defaultProps = {
  color: 'random', // 'random, 'rainbow', '#hex', []
  count: 50, // number of sparkles
  minSize: 5,
  maxSize: 8,
  overflowPx: 20,
  flicker: true,
  flickerSpeed: 'normal' // One of: slowest, slower, slow, normal, fast, faster, fastest
  // TODO
  // fade out speed constant
  // movement speed control
  // direction toggle? or likelyhood of moving left/right/up/down
}

export default Sparkle