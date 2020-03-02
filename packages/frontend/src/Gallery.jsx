import React, { useState } from 'react'
import { useEffect } from 'react'

export const gallery = () => {
  const [initRun, setInitRun] = useState(false)
  const [pictures, setPictures] = useState(false)

  const toJson = res => res.json()
  const fetchImages = () => fetch('/api/gallery')


  useEffect(() => {
    !initRun && fetchImages().then(pics => setPictures(pics))
    setInitRun(true)
  }, initRun)

  return (
    <div>

    </div>
  )
}