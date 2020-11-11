import React from 'react'
import Sparkles from 'react-sparkle'
import clsx from 'clsx'
import indexStyles from "./index.module.css"

export default function Home() {
  return (
    <div>
      <div className={indexStyles.section}>
        <h2 className={indexStyles.exampleTitle}>Default</h2>
        <div className={indexStyles.exampleContainer}>
          <div className={indexStyles.code}>
            stuff here
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
