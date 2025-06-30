import { useState } from 'react';
import './App.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import CurriculumPage from './components/CurriculumPage';
import SubjectComparePage from './components/SubjectComparePage';


function App() {
  return (
    <>
      {/* Header */}
      <Header />
      {/* เนื้อหา */}
      <CurriculumPage />
      <SubjectComparePage />    
      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
