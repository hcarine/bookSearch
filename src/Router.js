import React from 'react'
import App from './App'
import Book from './Book'

import {
  BrowserRouter,
  Route
} from 'react-router-dom'

const Router = () => (
  <BrowserRouter>
	<div>
		<Route exact path="/" component={App}/>
    	<Route path="/book/:id" component={Book}/>
	</div>
  </BrowserRouter>
)
export default Router