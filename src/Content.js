import React, { Component } from 'react';
import axios from 'axios';

class Content extends Component {
	
	constructor(props) {
		
		super(props)
		this.state = {
		  posts: []
		}
		this.refreshList= this.refreshList.bind(this)
  }
	
	refreshList(query){
		axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:´${query}´&maxResults=20`)
		  .then(res => {
			if( res.status === 200 && res.data.totalItems > 0){
				const posts = res.data.items;
				this.setState({ posts });
			}
		  });
		
	}
	render() {
		return(
			<div className="App-content">
				<h3>{this.props.title}</h3>
				<InputSearch  loading="true" onChange={this.refreshList} />
				<ul>
					{this.state.posts.map(post =>
					<li key={post.id}>
					   <span className="title">Title Book: {post.volumeInfo.title}</span>
					   <span className="subtitle">Author: {post.volumeInfo.authors}</span>
					</li>
				  )}
				</ul>
				 
			</div>
		)
	}
}

export default Content;

class InputSearch extends Component {
	
	constructor(props){
		super(props)
		this.filterText = this.filterText.bind(this)
	}
	
	filterText(event){
		var value = event.target.value
		
		this.props.onChange(value)
		
	}
	
	
	render() {
		return(
			<input onChange={this.filterText} placeholder="escreva a palavra chave para o seu livro" />
		)
	}
}
