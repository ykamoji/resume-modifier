import 'bootstrap/dist/css/bootstrap.css'
import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Header from "./Components/Header/Header.tsx";
import { lazy } from "react";

const Home = lazy(() => import("./Components/Pages/Home.tsx"))
const Resume = lazy(() => import("./Components/Pages/Resume.tsx"))
const CoverLetter = lazy(() => import("./Components/Pages/CoverLetter.tsx"))

function App() {

  return (
    <>
        <HashRouter>
            <Header/>
            <Routes>
                <Route path='*' element={<Home />} />
                <Route path="/" element={<Home />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/coverLetter" element={<CoverLetter />} />
            </Routes>
        </HashRouter>
    </>
  )
}

export default App
