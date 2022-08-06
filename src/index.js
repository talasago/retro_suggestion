import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppHeader from './component/AppHeader';


class Search extends React.Component {
  render() {
    return ("hogehoge");
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <AppHeader />
        <Search />
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
