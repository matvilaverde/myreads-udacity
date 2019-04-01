import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom'
import './App.css'
import EachShelf from './EachShelf'
//import Search from './Search'
//import Book from './Book'

class BooksApp extends React.Component {
  state = {
    query: '',
    currentlyReading: ['jAUODAAAQBAJ', 'nggnmAEACAAJ'],
    wantToRead: ['1wy49i-gQjIC', 'IOejDAAAQBAJ'],
    read: ['sJf1vQAACAAJ'],
    searchResults: [''],
    allBooks: []
  }

  componentWillMount() {
    BooksAPI.getAll().then((response) => {
      this.setState({searchResults: '\'' + response[0].id + '\''})
      console.log(this.state.searchResults)
      //Dá pra acessar via response[0].id
      //this.setState({allBooks: response})
    })
  }

  shelfUpdater = (controller) => {
    this.setState(controller)
  }
  
  updateQuery = (query) => {
    this.setState({query}) 
  }
  
  searchBooks = (query) => {
    BooksAPI.search(query).then(books => {
      this.setState({searchResults: books})
    })
  }
  
  clearQuery = () => {
    this.setState({query: ''})
  }

  render() {
    
    const { currentlyReading, wantToRead, read, searchResults, query } = this.state

    return (
      <div className="app">
        <Route path='/search' render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to='/'><button className="close-search">Close</button></Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"
                  value={query} onChange={(event) => this.updateQuery(event.target.value)}
                  />
                <button className='clear-query' onClick={this.clearQuery}>Clear Query</button>
              </div>
            </div>
            <EachShelf title={'Search Results'} which={searchResults} shelfUpdater={this.shelfUpdater}/>
          </div>
        )}/>

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <EachShelf title={'Currently Reading'} which={currentlyReading} shelfUpdater={this.shelfUpdater}/>
            <EachShelf title={'Want To Read'} which={wantToRead} shelfUpdater={this.shelfUpdater}/>
            <EachShelf title={'Read'} which={read} shelfUpdater={this.shelfUpdater}/>
            <div className="open-search">
              <Link to='/search'><button>Add a Book</button></Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp

/*



      */