/* globals Image */

import React from 'react'
import PropTypes from 'prop-types'
import ResizeObserver from 'resize-observer-polyfill'

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
    this.sparkleCanvas = null
    this.sparkleContext = null
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
    if (!this.sparkleCanvas) {
      console.warn('No sparkles today :( The canvas did not render.')
      return
    }
    this.sparkleContext = this.sparkleCanvas.getContext('2d')
    this.parentResizeObserver()
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

  sizeCanvas (parentWidth, parentHeight) {
    const { overflowPx } = this.props

    // Size the canvas
    this.sparkleCanvas.width = parentWidth + (2 * overflowPx)
    this.sparkleCanvas.height = parentHeight + (2 * overflowPx)
  }

  // Resize our canvas when the parent resizes
  parentResizeObserver () {
    const self = this
    const ro = new ResizeObserver((entries, observer) => {
      for (const entry of entries) {
        const {left, top, width, height} = entry.contentRect

        console.log('Element:', entry.target)
        console.log(`Element's size: ${width}px x ${height}px`)
        console.log(`Element's paddings: ${top}px ; ${left}px`)

        self.sizeCanvas(width, height)
      }
    })
    ro.observe(this.sparkleWrapper.parentNode)
  }

  randomSparkleSize () {
    const { minSize, maxSize } = this.props
    return Math.floor(Math.random() * (maxSize - minSize + 1) + minSize)
  }

  randomHexColor () {
    // http://www.paulirish.com/2009/random-hex-color-code-snippets/
    return '#' + ('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6)
  }

  getColor () {
    const { color } = this.props
    var chosenColor
    if (color === 'random') {
      chosenColor = this.randomHexColor()
    // Check if is an array
    } else if ((Array.isArray && Array.isArray(color)) || color instanceof Array) {
      // Choose a random color from the array
      chosenColor = color[Math.floor(Math.random() * color.length)]
    } else {
      chosenColor = color
    }
    return chosenColor
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
    const size = this.randomSparkleSize()
    return Object.assign(existingSparkle, {
      // Subtract size so sparkles don't get cut off by the edge of the canvas
      position: {
        x: Math.floor(Math.random() * (this.sparkleCanvas.width - size)),
        y: Math.floor(Math.random() * (this.sparkleCanvas.height - size))
      },
      size: size,
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
    if (!this.sparkleCanvas || !this.sparkleContext) {
      return
    }

    // Clear canvas
    this.sparkleContext.clearRect(0, 0, this.sparkleCanvas.width, this.sparkleCanvas.height)

    const self = this

    // Draw each sparkle
    this.sparkles.forEach((sparkle) => {
      self.sparkleContext.save()
      self.sparkleContext.globalAlpha = sparkle.opacity
      self.sparkleContext.drawImage(
        sprite,
        sparkle.variant, // show different sparkle styles
        0, 7, 7,
        sparkle.position.x,
        sparkle.position.y,
        sparkle.size, sparkle.size
      )

      // Tint with the color
      if (sparkle.color) {
        self.sparkleContext.globalCompositeOperation = 'source-atop'
        self.sparkleContext.globalAlpha = 0.6
        self.sparkleContext.fillStyle = sparkle.color
        self.sparkleContext.fillRect(
          sparkle.position.x, sparkle.position.y,
          sparkle.size, sparkle.size)
      }

      self.sparkleContext.restore()
    })
  }

  updateSparkles () {
    const { flicker, flickerSpeed, fadeOutSpeed, newSparkleOnFadeOut } = this.props
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
        sparkle.opacity -= 0.001 * fadeOutSpeed

        // Sometimes change the sparkle variant for a "flicker" effect
        if (flicker) {
          const flickerSpeedConstant = flickerSpeedConstants[flickerSpeed]
          if (currentTimeInt % Math.floor((Math.random() * flickerSpeedConstant) + 1) === 0) {
            sparkle.variant = self.getSpriteVariant()
          }
        }

        // Sparkle has faded out
        if (sparkle.opacity < 0) {
          // Either replace the sparkle with a brand new one or
          // reset the opacity
          if (newSparkleOnFadeOut) {
            self.recreateSparkle(sparkle)
          } else {
            sparkle.opacity = self.getOpacity()
          }
        }
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
          left: `-${overflowPx}px`,
          pointerEvents: 'none'
        }}
      >
        <canvas
          ref={(canvas) => {
            this.sparkleCanvas = canvas
          }}
        />
      </span>
    )
  }
}

Sparkle.propTypes = {
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  count: PropTypes.number,
  minSize: PropTypes.number,
  maxSize: PropTypes.number,
  overflowPx: PropTypes.number,
  fadeOutSpeed: PropTypes.number,
  newSparkleOnFadeOut: PropTypes.bool,
  flicker: PropTypes.bool,
  flickerSpeed: PropTypes.oneOf(
    ['slowest', 'slower', 'slow', 'normal', 'fast', 'faster', 'fastest']
  )
}

Sparkle.defaultProps = {
  // The color of the sparkles. Can be a color, an array of colors,
  // or 'random' (which will randomly pick from all hex colors).
  color: '#FFF',
  // The number of sparkles to render. A large number could slow
  // down the page.
  count: 50,
  // The minimum and maximum diameter of sparkles, in pixels.
  minSize: 5,
  maxSize: 8,
  // The number of pixels the sparkles should extend beyond the
  // bounds of the parent element.
  overflowPx: 20,
  // How quickly sparkles disappear; in other words, how quickly
  // new sparkles are created. Should be between 0 and 1000,
  // with 0 never fading sparkles out and 1000 immediately
  // removing sparkles. Most meaningful speeds are between
  // 0 and 150.
  fadeOutSpeed: 50,
  // Whether we should create an entirely new sparkle when one
  // fades out. If false, we'll just reset the opacity, keeping
  // all other attributes of the sparkle the same.
  newSparkleOnFadeOut: true,
  // Whether sparkles should have a "flickering" effect.
  flicker: true,
  // How quickly the "flickering" should happen.
  // One of: slowest, slower, slow, normal, fast, faster, fastest
  flickerSpeed: 'normal'
}

// Features that would be good to add:
// - Option to fade in new sparkles
// - Sparkle movement
//    - "Wandering" movement, as in https://github.com/simeydotme/jQuery-canvas-sparkles
//    - Function-based movement likelihood (e.g. gravity-esque behavior)
//    - Recreate sparkles when they leave the canvas
// - Larger-sized sparkles that still look good (the existing
//   sprites get blurry); possibly use drawn canvas images
//   instead of sprites
export default Sparkle
