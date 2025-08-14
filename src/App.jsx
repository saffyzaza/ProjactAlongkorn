import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Home/Header';
import { Footer } from './components/Home/Footer';
import CurriculumEN from './components/CurriculumENAlongkron/CurriculumEN';
import CurriculumCE from './components/CurriculumENCE/CurriculumCE';
import Cat from './components/img/Cat.jpg';


import HomePage from './components/Home/HomePage';


function App() {

  
  return (
    <>
      <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <br />

        <main className="flex-grow p-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/curriculumEN" element={<CurriculumEN />} />
            <Route path="/curriculumCE" element={<CurriculumCE />} />
            <Route path="/curriculumMCE" element={<div className='flex-row justify-center' >
              <br />
              <br />
              <img src={Cat} className='w-500 h-50' alt="Curriculum MCE" />
              <p className='text-gray-600 text-center text-3xl font-bold p-2'>รอก่อนน้าา</p>

              </div>} />

          </Routes>
        </main>
        

        <Footer />
      </div>
    </Router>
      
    </>
  );
}

export default App;
