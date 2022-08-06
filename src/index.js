import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';




class Search extends React.Component {
  render (){
    return ("hogehoge");
  }
}

class App extends React.Component {
  render() {
    return (
      <div className='main'>
        <div className='header'>
          <h2>ふりかえり手法を決めてくれるやつ</h2>
        </div>
        <div className='search'>
          <Search />
        </div>
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
