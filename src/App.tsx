import { Outlet } from 'react-router';
import useGetUser from './hooks/useGetUser'

const App: React.FC = () => {
 
  useGetUser()
  return (
    <>
      <Outlet />
    </>
  )
}

export default App
