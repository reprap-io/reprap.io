import React, { Component } from 'react';
import { BrowserRouter as Router }  from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import HomePageLayout from './HomePageLayout';


class App extends Component {
	render() {
	return (
	<div>
	<Router>
		{ /* <Hero /> */ }
	<HomePageLayout />
	</Router>
        </div>

  );
  }
}
export default App;
