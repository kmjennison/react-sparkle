import React from 'react'
import Sparkles from 'react-sparkle'
import clsx from 'clsx'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import * as indexStyles from './index.module.css'

const reactSparkleDependencyVersion =
  require('../../package.json').dependencies['react-sparkle']
const reactDependencyVersion = require('../../package.json').dependencies.react

const boxCSS = `
.box {
  position: relative; /* mandatory */
  background: #00bdbd;
  width: 140px;
  height: 140px;
}
`

const textContainerCSS = `
.container {
  position: relative; /* mandatory */
}
`

const exampleA = `
import Sparkles from 'react-sparkle'

const Demo = () => (
  <div className="box">
    <Sparkles flicker={false} />
  </div>
)
`

const exampleB = `
import Sparkles from 'react-sparkle'

const Demo = () => (
  <div className="box">
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
)
`

const exampleC = `
import Sparkles from 'react-sparkle'

const Demo = () => (
  <span className={"container"}>
    <h4>I am so sparkly. Look at me go!</h4>
    <Sparkles color="teal" overflowPx={8} />
  </span>
)
`

const exampleD = `
import Sparkles from 'react-sparkle'

const Demo = () => (
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
      <a
        className={indexStyles.titleLink}
        href="https://github.com/kmjennison/react-sparkle"
      >
        <h1>react-sparkle</h1>
      </a>
      <div style={{ paddingLeft: 24, paddingRight: 24 }}>
        <p style={{ margin: 0 }}>Version: {reactSparkleDependencyVersion}</p>
        <p style={{ margin: 0 }}>React version: {reactDependencyVersion}</p>
      </div>
      <div className={indexStyles.section}>
        <h2 className={indexStyles.exampleTitle}>Simple</h2>
        <div className={indexStyles.exampleContainer}>
          <div className={indexStyles.codeContainer}>
            <div className={indexStyles.codeBox}>
              <SyntaxHighlighter language="jsx">{exampleA}</SyntaxHighlighter>
            </div>
            <SyntaxHighlighter language="css">{boxCSS}</SyntaxHighlighter>
          </div>
          <div className={clsx(indexStyles.darkBackground, indexStyles.demo)}>
            <div className={indexStyles.sparkleTarget}>
              <Sparkles flicker={false} />
            </div>
          </div>
        </div>
      </div>

      <div className={indexStyles.section}>
        <h2 className={indexStyles.exampleTitle}>
          Different Color, Size, and Speed
        </h2>
        <div className={indexStyles.exampleContainer}>
          <div className={indexStyles.codeContainer}>
            <SyntaxHighlighter language="jsx">{exampleB}</SyntaxHighlighter>
          </div>
          <div
            className={clsx(indexStyles.lighterBackground, indexStyles.demo)}
          >
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
        <h2 className={indexStyles.exampleTitle}>Make Text Sparkle</h2>
        <div className={indexStyles.exampleContainer}>
          <div className={indexStyles.codeContainer}>
            <div className={indexStyles.codeBox}>
              <SyntaxHighlighter language="jsx">{exampleC}</SyntaxHighlighter>
            </div>
            <SyntaxHighlighter language="css">
              {textContainerCSS}
            </SyntaxHighlighter>
          </div>
          <div
            className={clsx(indexStyles.lighterBackground, indexStyles.demo)}
          >
            <span className={indexStyles.sparkleTextTarget}>
              <h4>I am so sparkly. Look at me go!</h4>
              <Sparkles color="teal" overflowPx={8} />
            </span>
          </div>
        </div>
      </div>

      <div className={indexStyles.section}>
        <h2 className={indexStyles.exampleTitle}>Permanent Sparkles</h2>
        <div className={indexStyles.exampleContainer}>
          <div className={indexStyles.codeContainer}>
            <SyntaxHighlighter language="jsx">{exampleD}</SyntaxHighlighter>
          </div>
          <div
            className={clsx(indexStyles.lighterBackground, indexStyles.demo)}
          >
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
