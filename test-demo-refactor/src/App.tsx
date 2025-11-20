import { Suspense } from 'react'
import Loader from '@/components/Loader'
import { AppRoutes } from '@/routes'

const App: React.FC = () => (
  <Suspense fallback={<Loader />}>
    <AppRoutes />
  </Suspense>
)

export default App
