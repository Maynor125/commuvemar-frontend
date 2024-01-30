
import ProtectedPage from '@/middleware/ProtectedPage'
import React from 'react'

const OverView = () => {
  return (
    <ProtectedPage>
          <div>OverView</div>
    </ProtectedPage>
  )
}

export default OverView

