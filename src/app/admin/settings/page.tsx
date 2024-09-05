import ProtectedPage from '@/middleware/ProtectedPage'
import React from 'react'

const Settings = () => {
  return (
    <ProtectedPage>
          <div>Settings</div>
    </ProtectedPage>

  )
}

export default Settings