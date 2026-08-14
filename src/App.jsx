import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import EWasteIntro from './components/EWasteIntro'
import Lifecycle from './components/Lifecycle'
import ManagementMethods from './components/ManagementMethods'
import FiveRFramework from './components/FiveRFramework'
import Assignments from './components/Assignments'
import CaseStudies from './components/CaseStudies'
import ResearchResources from './components/ResearchResources'
import Sustainability from './components/Sustainability'
import Journey from './components/Journey'
import DidYouKnow from './components/DidYouKnow'
import Quiz from './components/Quiz'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Assignments />
        <EWasteIntro />
        <Lifecycle />
        <ManagementMethods />
        <FiveRFramework />
        <CaseStudies />
        <ResearchResources />
        <Sustainability />
        <Journey />
        <DidYouKnow />
        <Quiz />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
