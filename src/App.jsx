import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { Container } from '@mui/material';
import Navbar from './components/navbar/Navbar';
import { Route, Routes } from 'react-router-dom/dist';
import ProductsPage from './pages/ProductsPage';
import Snacks from './components/examples/Snacks';
import Fields from './components/examples/Fields';
import SkeletonCard from './components/examples/SkeletonCard';
import Alerts from './components/examples/Alerts';
import SignsPage from './pages/SignsPage';
import ProjectsPage from './pages/ProjectsPage';
import CustomersPage from './pages/CustomersPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<ProjectsPage />} />
        <Route path='/ventas' element={<Alerts />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/cotizaciones' element={<Snacks />} />
        <Route path='/signs' element={<SignsPage />} />
        <Route path='/projects/:customerId' element={<ProjectsPage />} />
        <Route path='/projects' element={<ProjectsPage />} />
        <Route path='/customers' element={<CustomersPage />} />
      </Routes>
    </>
  )
}

export default App
