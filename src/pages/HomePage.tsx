import { FC } from 'react'
import { AuthButtons,HomeFooter,Hero } from "../components/index";

const HomePage: FC = () => {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-600 flex flex-col items-center justify-center p-4">
                {/* Hero Section */}
                <Hero/>

                {/* Auth Buttons */}
                <AuthButtons/>

                {/* Features Section */}
                <HomeFooter/>
            </div>
        </>
    )
}

export default HomePage
