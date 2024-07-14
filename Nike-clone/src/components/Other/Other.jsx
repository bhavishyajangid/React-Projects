import React from 'react'
import { useParams } from 'react-router-dom'

const Other = () => {
  const {id} = useParams()
  return (
    <div>Other : {id}</div>
  )
}

export default Other