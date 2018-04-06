import * as React from 'react';
import Input from './input';
import '../static/css/App.css';

const logo = require('./../logo.svg');

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Github Repo Search</h1>
        </header>
        <Input />
      </div>
    );
  }
}

export default App;
