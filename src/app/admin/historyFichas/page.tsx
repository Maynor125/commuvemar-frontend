import BotonFlotante from '@/components/BotonFlotante'
import ProtectedPage from '@/middleware/ProtectedPage'
import React from 'react'

const HistoryFichas = () => {
  return (
    <ProtectedPage>
          <div>HistoryFichas</div>
          <BotonFlotante/>
    </ProtectedPage>
  )
}

export default HistoryFichas