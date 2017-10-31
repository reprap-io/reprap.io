import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css'
import Hero from './Hero'
import PrimaryPane from './PrimaryPane'


class App extends Component {
	render() {
	return (
	<div>
	<Hero />
	<PrimaryPane />
        </div>
  );
  }
}
export default App;
