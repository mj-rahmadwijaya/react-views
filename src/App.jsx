import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router';
import ReactViews from './pages/ReactViews';
import ElectronViews from './pages/ElectronViews';

function App() {

  return (
    <div className="bg-white shadow-lg rounded-lg w-full h-full flex">
      <Router>

        <div className="w-64 bg-blue-200">
          <nav className='p-4'>
            <ul className='flex flex-col gap-4'>
              <Link className='text-white' to="/">
                <li className='p-2 rounded-md bg-blue-300'>
                  React
                </li>
              </Link>
              <Link className='text-white' to="/electron">
                <li className='p-2 rounded-md bg-blue-300'>
                  Electron
                </li>
              </Link>
            </ul>
          </nav>
        </div>
        <div className='w-full p-4 overflow-x-auto h-full'>
          <Routes>
            <Route path="/" element={<ReactViews />} />
            <Route path="/electron" element={<ElectronViews />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App
