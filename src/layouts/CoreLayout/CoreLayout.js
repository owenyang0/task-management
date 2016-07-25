import React, { PropTypes } from 'react'

import '../../styles/core.scss'

function CoreLayout ({ children }) {
  return (
    <div className='container--zen'>
      <div className='view-container'>
        {children}
      </div>
    </div>
  )
}

CoreLayout.propTypes = {
  children: PropTypes.element
}

export default CoreLayout
