import { Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Home from "../pages/Home/Home";
import Product from "../pages/Product/Product";
import AppFooter from "../appFooter/AppFooter";
import Login from "../pages/Login/Login";
import ProductCreating from "../pages/ProductCreating/ProductCreating";
import Register from "../pages/Register/Register";
import Store from "../pages/Store/Store";
import IdeaCreating from "../pages/IdeaCreate/IdeaCreating";
import ReviewIdeas from "../pages/ReviewIdeas/ReviewIdeas";
import PageOfIdea from "../pages/PageOfIdea/PageOfIdea";
import Panel from "../pages/AdminPanel/Panel";
import ApprovedIdeas from "../pages/ApprovedIdeas/ApprovedIdeas";
import Projects from "../pages/Projects/Projects";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import background from '../../resources/background.jpg';
import Cart from "../pages/cart/Cart";
import ProfilePage from "../pages/profile/Profile";



function App() {
    return (
      <div className="app">
        <AppHeader/>
        <img src={background} alt="" className="bg-img" />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/ideas/approved" element={<ApprovedIdeas/>}/>
          <Route path="/ideas/review" element={<ReviewIdeas/>}/>
          <Route path="/idea/:id" element={<PageOfIdea/>}/>
          <Route path="/store" element={<Store/>}/>
          <Route path="/product/:id" element={<Product />}/>
          <Route path="/PageOfIdea" element={<PageOfIdea/>}/>
          <Route path="/IdeaCreating" element={<IdeaCreating/>}/>
          <Route path="/productCreating" element={<ProductCreating/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/adminPanel" element={<Panel/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/profile/:id" element={<ProfilePage/>}/>
          {/* <Route path="/test" element={<Test/>}/> */}
        </Routes>
        <footer className="footer">
          <AppFooter/>
        </footer>
      </div>
    )
}

export default App;
