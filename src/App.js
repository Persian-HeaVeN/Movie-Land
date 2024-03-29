import React from 'react'
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Home from './pages/home';
import Nav from './components/nav';
import { Provider } from 'react-redux';
import { store } from './components/store';
import { Favorites } from './pages/favorites';

export const apiKey = "38a6fdde";

function App() {
  return (
    <Provider store={store}>

      <Router>

        <Nav />

        <Routes>

          <Route path="/Movie-Land" element={<Home />} />

          <Route path="/Movie-Land/favorites" element={<Favorites />} />

        </Routes>

      </Router>

    </Provider>
  )
}

export default App

