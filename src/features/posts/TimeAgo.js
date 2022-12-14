import React from 'react'

export const TimeAgo = ({ timestamp }) => {
  
  return (
    <small className="text-muted" title={timestamp}>
      <i>{timestamp}</i>
    </small>
  )
}