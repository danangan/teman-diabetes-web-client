import React, { Component } from 'react';
import firebase from 'firebase';

import './App.css';
import firebaseConfig from './firebaseConfig'

// initialize firebase here

firebase.initializeApp(firebaseConfig);

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      authToken: '',
      userData: {

      },
      fcmToken: '',
    }
    this.login = this.login.bind(this)
  }

  componentWillMount() {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // clear the timeout
        firebase
          .auth()
          .currentUser.getIdToken()
          .then(firebaseIdToken => {
            this.setState({authToken: firebaseIdToken}, () => {
              // get the current user here
            })
          });
      }
    });
  }

  login() {
    const {email, password} = this.state
    firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
      // get the currentUser
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Teman Diabetes Testing Web Platform</h1>
        </header>
        <div className="App-content">
          <div className="Login-section">
            <h3>Login </h3>
            <input 
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => { this.setState({email: e.target.value})}} />
            <input 
              placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={(e) => { this.setState({password: e.target.value})}} />
            <button
              className="login-button"
              onClick={this.login}
            >
            Send
            </button>
          </div>
          {
            this.state.authToken && this.state.authToken !== '' &&
            <div className="AuthToken-Section">
              <h3>Your Auth Token</h3>
              <code className="AuthToken">
                {this.state.authToken}
              </code>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default App;
