import React, { Component } from 'react';
import Content from './Content.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
		<Header title={"Bem vindo ao book-search"}/>
		<Content title={"Vamos pesquisar um livro"}/>
      </div>
    );
  }
}

export default App;

export const Header = (props) =>
	<div className="App-header">
	  <h1>{props.title}</h1>
	</div>;
