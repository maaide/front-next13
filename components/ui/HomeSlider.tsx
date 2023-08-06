"use client"
import React, { useEffect, useState } from 'react'
import browser from 'browser-detect'
import { SafariHomeSlider, OtherHomeSlider } from './'

export const HomeSlider = () => {

  const [browserName, setBrowserName] = useState('')

  useEffect(() => {
    setBrowserName(browser().name!)
  }, [])

  return (
    <div>
      {
        browserName === 'safari'
          ? <SafariHomeSlider />
          : <OtherHomeSlider />
      }
    </div>
  )
}