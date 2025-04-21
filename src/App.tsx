import 'bootstrap/dist/css/bootstrap.css'
import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Header from "./Components/Header/Header.tsx";
import {lazy, useMemo} from "react";

const Home = lazy(() => import("./Components/Pages/Home.tsx"))
const Resume = lazy(() => import("./Components/Pages/Resume.tsx"))
const CoverLetter = lazy(() => import("./Components/Pages/CoverLetter.tsx"))

function App() {

    const home = useMemo(() => <Home/>, []);

    return (
    <>
        <HashRouter>
            <Header/>
            <Routes>
                <Route path='*' element={home} />
                <Route path="/" element={home} />
                <Route path="/resume" element={<Resume/>} />
                <Route path="/coverLetter" element={<CoverLetter/>} />
            </Routes>
        </HashRouter>
    </>
  )
}

export default App
