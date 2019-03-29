import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'
import SearchPage from './SearchPage'
import MainPage from './MainPage'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchPage books={this.state.books} />
        )}/>


        <Route exact path='/' render={() => (
          <MainPage />
        )}/>
      </div>
    )
  }
}

export default BooksApp
