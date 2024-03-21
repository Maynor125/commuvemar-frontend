import BotonFlotante from '@/components/BotonFlotante'
import ProtectedPage from '@/middleware/ProtectedPage'
import React from 'react'

const AnalysisFichas = () => {
  return (
    <ProtectedPage>
          <div>AnalysisFichas</div>
          <BotonFlotante/>
    </ProtectedPage>

  )
}

export default AnalysisFichas