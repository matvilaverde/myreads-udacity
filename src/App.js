import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'
import SearchPage from './SearchPage'
import Shelves from './Shelves'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: [],
    currentlyReading: ['nggnmAEACAAJ','IOejDAAAQBAJ'],
    wantToRead: ['74XNzF_al3MC', 'sJf1vQAACAAJ'],
    read: ['jAUODAAAQBAJ'],
    query: ''
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  updateShelf = (shelvesObject) => {
    this.setState(shelvesObject)
    console.log('updateshelf!')
  }

  updateQuery = (query) => {
    this.setState({query})
  }

  render() {
    return (
      <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
        
          <Route path="/search" render={() => (
            <div>
            <SearchPage books={this.state.books} query={this.state.query} updateShelf={this.updateShelf} updateQuery={this.updateQuery}/>
            <Shelves
                    shelfTitle="Search Results"
                    updateShelf={this.updateShelf}
                    shelf={this.state.searchResults}/>
            </div>
          )}/>


          <Route exact path='/' render={() => (
            <div>
            <Shelves shelfTitle={'Currently Reading'} shelf={this.state.currentlyReading} updateShelf={this.updateShelf} />
            <Shelves shelfTitle={'Want To Read'} shelf={this.state.wantToRead} updateShelf={this.updateShelf} />
            <Shelves shelfTitle={'Read'} shelf={this.state.read} updateShelf={this.updateShelf} />
            </div>
          )}/>
          </div>
      </div>
    )
  }
}

export default BooksApp
