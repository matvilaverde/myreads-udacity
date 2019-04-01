import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom'
import './App.css'
import EachShelf from './EachShelf'

class BooksApp extends React.Component {
  /*
    Each state element is corresponding to their shelves;
    Their inicial values are equal to the server, so when the
    pages updates, they are on their correct shelves
  */

  state = {
    query: '',
    currentlyReading: ['nggnmAEACAAJ', 'sJf1vQAACAAJ'],
    wantToRead: ['74XNzF_al3MC', 'evuwdDLfAyYC'],
    read: ['jAUODAAAQBAJ', 'IOejDAAAQBAJ', '1wy49i-gQjIC'],
    searchResults: ['']
  }
  
  //Gets all books from the API and saves each the book's ID in an Array
  componentDidMount() {
    BooksAPI.getAll().then((res) => {
      let anArray = []
      for(let i = 0; i < res.length; i++) {
        anArray[i] = res[i].id
      }
      this.setState({searchResults: anArray})
  })}

  //Updates each shelf through the app in BooksAPI.update
  shelfUpdater = (controller) => {
    this.setState(controller)
  }
  
  //Saves and updates what the user is typing on the input value
  updateQuery = (query) => {
    this.setState({query}) 
  }
  
  //Will save all returned books from the API in an array
  searchBooks = (query) => {
    BooksAPI.search(query).then(books => {
      this.setState({searchResults: books.push})
    })
  }
  
  //Resets input to empty and placeholder
  clearQuery = () => {
    this.setState({query: ''})
  }

  render() {
    
    const { currentlyReading, wantToRead, read, searchResults, query } = this.state

    return (
      <div className="app">
      {/* 
          The "main page" renders everything
      */}
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            {/*
                Each shelf is controlled by an array of the same name
            */}
            <EachShelf title={'Currently Reading'} which={currentlyReading} shelfUpdater={this.shelfUpdater}/>
            <EachShelf title={'Want To Read'} which={wantToRead} shelfUpdater={this.shelfUpdater}/>
            <EachShelf title={'Read'} which={read} shelfUpdater={this.shelfUpdater}/>
            <div className="open-search">
              <Link to='/search'><button>Add a Book</button></Link>
            </div>
          </div>
        )}/>

        {/*
            The search page renders the search bar and getAll books at the moment
        */}
        <Route path='/search' render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to='/'><button className="close-search">Close</button></Link>
              <div className="search-books-input-wrapper">
              {/* 
                  Search's input calls for state.query updates
              */}
                <input type="text" placeholder="Search by title or author"
                  value={query} onChange={(event) => this.updateQuery(event.target.value)}
                  />
                <button className='clear-query' onClick={this.clearQuery}>Clear Query</button>
              </div>
            </div>
            {/* 
                Treats search results just like the other shelves
            */}
            <EachShelf title={'Search Results'} which={searchResults} shelfUpdater={this.shelfUpdater}/>
          </div>
          )}/>
      </div>
    )
  }
}

export default BooksApp

/*



      */