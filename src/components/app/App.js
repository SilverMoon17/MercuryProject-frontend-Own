import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import Info from "../Info/Info";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import background from '../../resources/background.jpg';

class App extends Component {
  render() {
    return (
    <div className="app">
      <AppHeader/>
      <main className="main">
        <img src={background} alt="" className="bg-img" />
      </main>
      <Info/>
    </div>
    )
  }
}

export default App;
