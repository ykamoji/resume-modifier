import 'bootstrap/dist/css/bootstrap.css'
import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Header from "./Components/CoverLetter/Header/Header.tsx";
import Home from "./Components/Pages/Home.tsx";
import Resume from "./Components/Pages/Resume.tsx";
import CoverLetter from "./Components/Pages/CoverLetter.tsx";


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
