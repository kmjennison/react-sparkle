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

export default function Home() {
  return (
    <div>
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
    </div>
  )
}
