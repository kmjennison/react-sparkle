import React from 'react'

export interface ReactSparkleProps {
  /**
   * The color of the sparkles. Can be a color, an array of colors,
   * or 'random' (which will randomly pick from all hex colors).
   */
  color?: string | string[]

  /** The number of sparkles to render. A large number could slow
   *  down the page. */
  count?: number

  /** The minimum and maximum diameter of sparkles, in pixels. */
  minSize?: number
  maxSize?: number

  /** The number of pixels the sparkles should extend beyond the
   *  bounds of the parent element.
   */
  overflowPx?: number

  /** How quickly sparkles disappear; in other words, how quickly
   *  new sparkles are created. Should be between 0 and 1000,
   *  with 0 never fading sparkles out and 1000 immediately
   *  removing sparkles. Most meaningful speeds are between
   *  0 and 150.
   */
  fadeOutSpeed?: number

  /** Whether we should create an entirely new sparkle when one
   *  fades out. If false, we'll just reset the opacity, keeping
   *  all other attributes of the sparkle the same.
   */
  newSparkleOnFadeOut?: boolean

  /** Whether sparkles should have a "flickering" effect. */
  flicker?: boolean

  /** How quickly the "flickering" should happen.
   *  One of: 'slowest', 'slower', 'slow', 'normal', 'fast', 'faster', 'fastest'
   */
  flickerSpeed?:
    | 'slowest'
    | 'slower'
    | 'slow'
    | 'normal'
    | 'fast'
    | 'faster'
    | 'fastest'
}

export default class ReactSparkle extends React.Component<ReactSparkleProps> {}
