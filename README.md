[![Build Status](https://travis-ci.org/kmjennison/react-sparkle.svg?branch=master)](https://travis-ci.org/kmjennison/react-sparkle)
# react-sparkle
Make your React app more :sparkles:sparkly:sparkles:

## How to Use

Install: `yarn add react-sparkle` or `npm install react-sparkle`

Add `Sparkle` as a child of the element you want to add sparkles to. _Important:_ the parent element must have either `relative` or `absolute` positioning.

```js
import React from 'react'
import Sparkle from 'react-sparkle'

class SparklyThing extends React.Component {
  // Note: the parent of Sparkle must be positionted relatively or absolutely
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
  // One of={slowest, slower, slow, normal, fast, faster, fastest}
  flickerSpeed={'normal'}
/>
```
