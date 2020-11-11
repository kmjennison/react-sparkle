import React from 'react'
import Sparkles from 'react-sparkle'
import clsx from 'clsx'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import indexStyles from "./index.module.css"

const exampleA = `
<div className="box">
  <Sparkles />
</div>
`

export default function Home() {
  return (
    <div>
      <div className={indexStyles.section}>
        <h2 className={indexStyles.exampleTitle}>Default</h2>
        <div className={indexStyles.exampleContainer}>
          <div className={indexStyles.codeContainer}>
            <SyntaxHighlighter language="jsx">
              {exampleA}
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
