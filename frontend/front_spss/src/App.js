// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import './App.css';

// function App() {
//   return (
//     <div className="text-center">
//       <h1 className="text-4xl font-bold text-blue-500">Hello, TailwindCSS!</h1>
//     </div>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/header";


function App() {
  return (
    <Router>
      {/* Header */}
      <Header />

      {/* Nội dung chính */}
      <main className="container mx-auto p-4">
        <Routes>
          
        </Routes>
      </main>
    </Router>
  );
}

export default App;
