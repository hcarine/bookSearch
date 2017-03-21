import React, { Component } from 'react';
import { Card, CardText, CardTitle, CardActions, Grid, Cell } from 'react-mdl';
import {Link} from 'react-router-dom'
import axios from 'axios'
import {Infinite} from 'react-infinite'

class Content extends Component {
	
	constructor(props) {
		
		super(props)
		this.state = {
			posts: [],
			elementsLenght: 0
		}
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
	getInitialState() {
        return {
            elements: this.buildElements(0),
            isInfiniteLoading: false
        }
    }

    buildElements(start, query ) {
        var elements = [];
       	axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:´${query}´&startIndex´${start}´&maxResults=20`)
		  .then(res => {
			if( res.status === 200 && res.data.totalItems > 0){
				const posts = res.data.items;
				this.setState({ posts });
				elements = elements + 20
				return elements
			}
		  });
        return elements;
    }

    handleInfiniteLoad() {
        var that = this;
        this.setState({
            isInfiniteLoading: true
        })
        setTimeout(function() {
            var elemLength = that.state.posts.length,
                newElements = that.buildElements(elements);
            that.setState({
                isInfiniteLoading: false,
                elements: that.state.elements.concat(newElements)
            });
        }, 2500);
    }

    elementInfiniteLoad() {
        return <div className="infinite-list-item">
            Loading...
        </div>;
    }

	
	render() {
		return(
			<div className="App-content">
				<h3>{this.props.title}</h3>
				<InputSearch  loading="true" onChange={this.refreshList} />
				

				<Grid className="demo-grid-1">
					<Infinite 
                         onInfiniteLoad={this.handleInfiniteLoad}
                         loadingSpinnerDelegate={this.elementInfiniteLoad()}
                         isInfiniteLoading={this.state.isInfiniteLoading}
                         >
						{this.state.posts.map(post =>
									<Cell col={4} key={post.id}>	 
										<Card shadow={0} style={{width: '320px', height: '320px', margin: '0', display:'flex'}}>
											<CardTitle expand style={{color: '#fff', backgroundColor: '#46B6AC', textTransform: 'lowercase'}}>				
												{post.volumeInfo.title}
											</CardTitle>
											<CardText>
												{post.volumeInfo.title}
											</CardText>
											<CardActions border>
												<Link to={"/book/"+post.id}>+ detalhes</Link>
											</CardActions>
										</Card>
									</Cell>
								)}
        			</Infinite>
					
				</Grid>			 
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
			<input onChange={this.filterText} placeholder="Escreva a palavra chave para o seu livro" />
		)
	}
}
