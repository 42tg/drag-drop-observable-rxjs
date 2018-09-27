import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { fromEvent } from 'rxjs';
import {  map } from 'rxjs/operators';

class App extends Component {
  constructor(props){
    super(props)

    this.subscription = []
    this.observer = fromEvent(document, 'mousemove').pipe(
      map(event => ({x: event.clientX, y: event.clientY}))
    )
    this.state= {}
  }

  addListener = () => {
    this.subscription.push(this.observer.subscribe(this.setState.bind(this)))
    this.subscription.push(this.observer.subscribe(console.log))
  }
  removeListener = () => {
    this.subscription.map(s => s.unsubscribe())
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div style={{height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
          onMouseEnter={this.addListener} onMouseLeave={this.removeListener}
          >
          <div style={{
            width: '50px',
            height: '50px',
            position: 'absolute',
            top: this.state.y || '200px',
            left: this.state.x || '200px',
            backgroundColor: 'red',
          }}
          // draggable={true}
          // onDrag={this.addListener}
          // onDrop={this.removeListener}
          >

          </div>
          Enter your mouse here
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
