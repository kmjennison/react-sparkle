[![npm](https://img.shields.io/npm/v/react-sparkle.svg)](https://www.npmjs.com/package/react-sparkle)
[![npm](https://img.shields.io/npm/dt/react-sparkle.svg)](https://www.npmjs.com/package/react-sparkle)


# react-sparkle
Make your React app more :sparkles:sparkly:sparkles:

## Demo

* [Examples](https://kmjennison.github.io/react-sparkle/)
* [Demo source code](./demo/)

## How to Use

Install: `yarn add react-sparkle` or `npm install react-sparkle`

Add `Sparkle` as a child of the element you want to add sparkles to. _Important:_ the parent element must have either `relative` or `absolute` positioning.

```js
import React from 'react'
import Sparkle from 'react-sparkle'

class SparklyThing extends React.Component {
  // Note: the parent of Sparkle must be positioned relatively or absolutely
  render () {
    return (
      <div style={{ position: 'relative' }}>
        <Sparkle />
      </div>
    )
  }
}
```

## Options

All props are optional. These are the defaults:

```js
<Sparkle
  // The color of the sparkles. Can be a color, an array of colors,
  // or 'random' (which will randomly pick from all hex colors).
  color={'#FFF'}
  
  // The number of sparkles to render. A large number could slow
  // down the page.
  count={50}
  
  // The minimum and maximum diameter of sparkles, in pixels.
  minSize={5}
  maxSize={8}
  
  // The number of pixels the sparkles should extend beyond the
  // bounds of the parent element.
  overflowPx={20}
  
  // How quickly sparkles disappear; in other words, how quickly
  // new sparkles are created. Should be between 0 and 1000,
  // with 0 never fading sparkles out and 1000 immediately
  // removing sparkles. Most meaningful speeds are between
  // 0 and 150.
  fadeOutSpeed={50}
  
  // Whether we should create an entirely new sparkle when one
  // fades out. If false, we'll just reset the opacity, keeping
  // all other attributes of the sparkle the same.
  newSparkleOnFadeOut={true}
  
  // Whether sparkles should have a "flickering" effect.
  flicker={true}
  
  // How quickly the "flickering" should happen.
  // One of: 'slowest', 'slower', 'slow', 'normal', 'fast', 'faster', 'fastest'
  flickerSpeed={'normal'}
/>
```

## Possible Future Features
Features that would be good to add:
* An `active` prop to turn the sparkles on and off
* An option to fade in new sparkles
* Sparkle movement
   * "Wandering" movement, as in [jQuery Canvas Sparkles](https://github.com/simeydotme/jQuery-canvas-sparkles).
   * Function-based movement likelihood (e.g. gravity-esque behavior)
   * We would recreate sparkles when they leave the canvas
* Larger-sized sparkles that still look good (the existing sprites get blurry); possibly use drawn canvas shapes instead of image sprites
* Declarative updates for the number of sparkles, canvas size, and fade out speed. Currently, updating these requires re-mounting the component.

## Acknowledgements
This code was inspired by and based on [jQuery Canvas Sparkles](https://github.com/simeydotme/jQuery-canvas-sparkles).
