import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { Grid, Cell } from 'react-mdl'

class Book extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			bookId: props.match.params.id,
			book: undefined
		}
		this.refreshBook = this.refreshBook(this)

	}
	refreshBook(query){
		axios.get(`https://www.googleapis.com/books/v1/volumes/${this.state.bookId}`)
		  .then(res => {
			if( res.status === 200){
				
				this.setState({ book: res.data })
			}
		  });
	}
	
	render() {
		let content;
		if(typeof this.state.book	 !== "undefined")
			content = <BookContent book={this.state.book}></BookContent>;
		else
			content = <p>Caregando ... </p>;
		return (
			<div className="App-content">
				<Link to="/" className="return">Voltar</Link>
				{content}
			</div>
		);
	}
}

export default Book;

class BookContent extends Component {
	render() {
		var bookImg = this.props.book.volumeInfo.imageLinks.medium ? this.props.book.volumeInfo.imageLinks.medium : "/imgs/book.svg"
		return(
			<Grid className="demo-grid-1 book-content">
				<Cell col={4}>
					<img className="icon-book" src={bookImg}></img>
				</Cell>
				<Cell col={8}>
					<h2><small>Título: </small>{this.props.book.volumeInfo.title}</h2>
					<h3><small>Autor: </small>{this.props.book.volumeInfo.authors}</h3>
					<p>{this.props.book.volumeInfo.description}</p>
					<p> <strong>Versão:</strong>
						{this.props.book.volumeInfo.contentVersion}</p>
					<p><strong>Linguagem:</strong> {this.props.book.volumeInfo.language}</p>
					<p> <strong>Pag:</strong> {this.props.book.volumeInfo.pageCount}</p>
				</Cell>
			</Grid>
		)
		
		
	}
}