import { Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Home from "../pages/Home/Home";
import Product from "../pages/Product/Product";
import AppFooter from "../appFooter/AppFooter";
import Login from "../pages/Login/Login";
import PageCreating from "../pages/ProductCreating/ProductCreating";
import Register from "../pages/Register/Register";
import Ideas from "../pages/Ideas/Ideas";
import Store from "../pages/Store/Store";
import IdeaCreating from "../pages/IdeaCreate/IdeaCreating";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import background from '../../resources/background.jpg';
import PageOfIdea from "../pages/PageOfIdea/PageOfIdea";
import Panel from "../pages/AdminPanel/Panel";



function App() {
    return (
      <div className="app">
        <AppHeader/>
        <img src={background} alt="" className="bg-img" />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/projects" element={<h1>Projects</h1>}/>
          <Route path="/ideas" element={<Ideas/>}/>
          <Route path="/store" element={<Store/>}/>
          <Route path="/product" element={<Product />}/>
          <Route path="/PageOfIdea" element={<PageOfIdea/>}/>
          <Route path="/IdeaCreating" element={<IdeaCreating/>}/>
          <Route path="/pageCreating" element={<PageCreating/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/Panel" element={<Panel/>}/>
        </Routes>
        <footer className="footer">
          <AppFooter/>
        </footer>
      </div>
    )
}

export default App;
