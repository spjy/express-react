import React, { Component } from 'react';
import io from 'socket.io-client';

import logo from './logo.svg';
import './App.css';

const socket = io('http://localhost:3001');

class App extends Component {

  state = {
    messages: [],
    email: '',
    password: '',
  }

  emailChange(e) {
    this.setState({ 
      email: e.target.value 
    });
  }

  passwordChange(e) {
    this.setState({ 
      password: e.target.value 
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Express</h1>
          <button onClick={this.logout.bind(this)}>Logout</button>
        </header>
        <br />
        <form action="" onSubmit={this.newMessage.bind(this)}>
          <input id="msg" type="text" />
          <button type="submit">Enter</button>
        </form>
        {this.state.messages.length !== 0 ? this.state.messages.map((message, i) => {
          return (
            <div key={i}>{message.text}</div>
          );
        }) : <div></div>}
        <form onSubmit={this.login.bind(this)}>
          Email: <input type="text" onChange={this.emailChange.bind(this)} value={this.state.email} />
          <br /><br />
          Password: <input type="text" onChange={this.passwordChange.bind(this)} value={this.state.password} />
          <br /><br />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
