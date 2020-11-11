import React from 'react'
import Sparkles from 'react-sparkle'
import clsx from 'clsx'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import indexStyles from "./index.module.css"

const boxCSS = `
.box {
  position: relative; /* mandatory */
  background: #00bdbd;
  width: 140px;
  height: 140px;
}
`

const exampleA = `
import Sparkles from 'react-sparkle'

const demo = () => (
  <div className="box">
    <Sparkles />
  </div>
)
`

const exampleB = `
import Sparkles from 'react-sparkle'

const demo = () => (
  <div className="box">
    <Sparkles
      color="red"
      count={20}
      minSize={7}
      maxSize={12}
      overflowPx={80}
      fadeOutSpeed={30}
      newSparkleOnFadeOut
      flicker={false}
      flickerSpeed="normal"
    />
  </div>
)
`

const exampleC = `
import Sparkles from 'react-sparkle'

const demo = () => (
  <div className="box">
    <Sparkles
      color="purple"
      fadeOutSpeed={10}
      newSparkleOnFadeOut={false}
      flicker
      flickerSpeed="fast"
      count={80}
    />
  </div>
)
`

export default function Home() {
  return (
    <div>
      <a className={indexStyles.titleLink} href="https://github.com/kmjennison/react-sparkle"><h1>react-sparkle</h1></a>
      <div className={indexStyles.section}>
        <h2 className={indexStyles.exampleTitle}>Default</h2>
        <div className={indexStyles.exampleContainer}>
          <div className={indexStyles.codeContainer}>
            <div className={indexStyles.codeBox}>
              <SyntaxHighlighter language="jsx">
                {exampleA}
              </SyntaxHighlighter>
            </div>
            <SyntaxHighlighter language="css">
              {boxCSS}
            </SyntaxHighlighter>
          </div>
          <div className={clsx(indexStyles.darkBackground, indexStyles.demo)}>
            <div className={indexStyles.sparkleTarget}>
              <Sparkles />
            </div>
          </div>
        </div>
      </div>

      <div className={indexStyles.section}>
        <h2 className={indexStyles.exampleTitle}>Different Color and Sizing</h2>
        <div className={indexStyles.exampleContainer}>
          <div className={indexStyles.codeContainer}>
            <SyntaxHighlighter language="jsx">
              {exampleB}
            </SyntaxHighlighter>
          </div>
          <div className={clsx(indexStyles.lighterBackground, indexStyles.demo)}>
            <div className={indexStyles.sparkleTarget}>
              <Sparkles
                color="red"
                count={20}
                minSize={7}
                maxSize={12}
                overflowPx={80}
                fadeOutSpeed={30}
                flicker={false}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={indexStyles.section}>
        <h2 className={indexStyles.exampleTitle}>Permanent Sparkles</h2>
        <div className={indexStyles.exampleContainer}>
          <div className={indexStyles.codeContainer}>
            <SyntaxHighlighter language="jsx">
              {exampleC}
            </SyntaxHighlighter>
          </div>
          <div className={clsx(indexStyles.lighterBackground, indexStyles.demo)}>
            <div className={indexStyles.sparkleTarget}>
              <Sparkles
                color="purple"
                fadeOutSpeed={10}
                newSparkleOnFadeOut={false}
                flicker
                flickerSpeed="fast"
                count={80}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
