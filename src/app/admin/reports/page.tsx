import BotonFlotante from '@/components/BotonFlotante'
import ProtectedPage from '@/middleware/ProtectedPage'
import React from 'react'

const Reports = () => {
  return (
    <ProtectedPage>
          <div>Reports</div>
          <BotonFlotante/>
    </ProtectedPage>

  )
}

export default Reports