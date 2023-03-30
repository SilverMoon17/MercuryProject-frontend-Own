import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app/App';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';
import './index.css';


const defaultState  = {
  Id: null,
  Role: "Guest",
  isLogged: false
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
      case "IdState":
        if (typeof action.payload === "string") {
          return {...state, Id: action.payload }
        }
        return state;
      case "RoleState":
          if (typeof action.payload === "string") {
              return {...state, Role: action.payload}
          }
          return state
      case "AuthState":
        if (typeof action.payload === "boolean") {
            return {...state, isLogged: action.payload}
        }
        return state
      default:
          return state;
  }
}

const store = createStore(reducer);

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
