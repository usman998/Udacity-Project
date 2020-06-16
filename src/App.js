import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'

import SearchPage from './searchpage'
import { Route } from 'react-router-dom'

import Shelf from './shelf'
class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    
  }
  referencing = React.createRef();

  render() {
    
    return <div>
        <Route exact path="/" component={() => <Shelf ref={this.referencing} />} />
        <Route path="/search" component={() => <SearchPage AppBooks={this.referencing.current && this.referencing.current.state} />} />
      </div>;

  }
}

export default BooksApp
