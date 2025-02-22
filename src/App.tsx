import { Outlet } from 'react-router';
import useGetUser from './hooks/useGetUser'
import Interface from './components/MessageComponents/Interface'
const App: React.FC = () => {
 
  useGetUser()
  return (
    <>
      <Outlet/>
    </>
  )
}

export default App
