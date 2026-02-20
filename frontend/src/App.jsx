import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from './pages/main_page/main_page';
import LoginPage from './pages/login_page/login_page';
import CheckoutPage from './pages/checkout_page/checkout_page';
import ChoicePage from './pages/choices_page/choice_page';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='App'>
      { <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/choice" element={<ChoicePage />} />
          <Route path="/store" element={<MainPage />} />
        </Routes>
      </Router>}
    </div>
    </>
  )
}

export default App
