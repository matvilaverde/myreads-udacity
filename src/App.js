import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom'
import './App.css'
import EachShelf from './EachShelf'

class BooksApp extends React.Component {

  //Each state element is corresponding to the app's shelves and query
  state = {
    currentlyReading: [''],
    wantToRead: [''],
    read: [''],
    searchResults: [''],
    query: ''
  }
  
  //Gets all books from the server and saves each book's ID in their corresponding array
  componentDidMount() {
    BooksAPI.getAll().then((res) => {
      let CRShelf = []
      let WTRShelf = []
      let RShelf = []
      for(let i = 0; i < res.length; i++) {
        if(res[i].shelf === 'currentlyReading')
          CRShelf.push(res[i].id)
        else if(res[i].shelf === 'wantToRead')
          WTRShelf.push(res[i].id)
        else if(res[i].shelf === 'read')
          RShelf.push(res[i].id)
      }

      this.setState({currentlyReading: CRShelf})
      this.setState({wantToRead: WTRShelf})
      this.setState({read: RShelf})

      //Starts the search page completely empty
      this.searchBooks('');
  })}

  //Updates each shelf through the app in BooksAPI.update
  shelfUpdater = (controller) => {
    this.setState(controller)
  }
  
  //Saves and updates what the user is typing on the input value
  updateQuery = (query) => {
    if(query === undefined)
      query = '';
      
    this.setState({query})
  }
  
  //Saves all returned books from the API's search in it's array
  searchBooks = (query) => {
    this.updateQuery(query);
    BooksAPI.search(query).then((serverBooks) => {

      let serverIDs = []

      if(serverBooks !== undefined) {
        for(let i = 0; i < serverBooks.length; i++) {
          serverIDs[i] = serverBooks[i].id
        }
        this.setState({searchResults: serverIDs})
      } else {
        this.setState({searchResults: []})
      }
    })
  }

  //Taking an empty search clears it immediatly and cleans the view and query
  clearQuery = () => {
    this.searchBooks('');
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
                  value={query} onChange={(event) => this.searchBooks(event.target.value)}
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