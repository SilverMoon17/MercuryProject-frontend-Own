import { Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Home from "../pages/Home/Home";
import Product from "../pages/Product/Product";
import AppFooter from "../appFooter/AppFooter";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import background from '../../resources/background.jpg';
import PageCreating from "../pages/ProductCreating/ProductCreating";

function App() {
    return (
      <div className="app">
        <AppHeader/>
        <img src={background} alt="" className="bg-img" />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/projects" element={<h1>Projects</h1>}/>
          <Route path="/ideas" element={<h1>Projects</h1>}/>
          <Route path="/store" element={<h1>Projects</h1>}/>
          <Route path="/product" element={<Product />}/>
          <Route path="/pageCreating" element={<PageCreating/>}/>
        </Routes>
        <footer className="footer">
          <AppFooter/>
        </footer>
      </div>
    )
}

export default App;
