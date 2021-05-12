import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css';

import Routes from './routes';

function App() {
  return (
    <div className="meals">
      <Provider store={ store }>
        <Routes />
      </Provider>
    </div>
  );
}

export default App;
