import React from 'react'
import App from './App'
import Book from './Book'

import {
  HashRouter,
  Route
} from 'react-router-dom'

const Router = () => (
  <HashRouter>
	<div>
		<Route exact path="/" component={App}/>
    	<Route path="/book/:id" component={Book}/>
	</div>
  </HashRouter>
)
export default Router