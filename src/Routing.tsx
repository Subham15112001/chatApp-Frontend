import { FC } from 'react'
import { Route, Routes } from "react-router";
import { HomePage, LoginPage, SignUpPage } from './pages/index.ts'
import App from './App.tsx'
import ProctectRoutes from './components/ProctectRoutes.tsx';


const Routing: FC = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path='login' element={<ProctectRoutes protectedRoutes={false}>
                        <LoginPage />
                    </ProctectRoutes>} />
                    <Route path='signup' element={<SignUpPage />} />
                </Route>
            </Routes>
        </div>
    )
}

export default Routing
