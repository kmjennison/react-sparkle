[![npm](https://img.shields.io/npm/v/react-sparkle.svg)](https://www.npmjs.com/package/react-sparkle)
[![npm](https://img.shields.io/npm/dt/react-sparkle.svg)](https://www.npmjs.com/package/react-sparkle)


# react-sparkle
Make your React app more :sparkles:sparkly:sparkles:

## Demo

* [Live demo](https://kmjennison.github.io/react-sparkle/)
* [Demo source code](./demo/)

## How to Use

Install: `yarn add react-sparkle` or `npm install react-sparkle`

Add `Sparkle` as a child of the element you want to add sparkles to. **Important:** the parent element must have either `relative` or `absolute` positioning.

```js
import React from 'react'
import Sparkle from 'react-sparkle'

const SparklyThing = () => (
  // Note: the parent of Sparkle must be positioned relatively or absolutely
  <div style={{ position: 'relative' }}>
    <Sparkle />
  </div>
)
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

## Limitations
* The props only take effect on mount. If you need modified props to take effect, you need to unmount and remount `Sparkle`.
* The sparkle image sprites aren't currently customizable. In the future, we might want to accept custom images or use drawn canvas shapes to eliminate the images altogether.

## Acknowledgements
This code was inspired by and based on [jQuery Canvas Sparkles](https://github.com/simeydotme/jQuery-canvas-sparkles).
