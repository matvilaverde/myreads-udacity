import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

class Search extends Component {
    render() {
    
        const { searchResults, shelfUpdater } = this.props

        return (
            <div className="search-books">
              <div className="search-books-bar">
                <Link to='/'><button className="close-search">Close</button></Link>
                <div className="search-books-input-wrapper">
                  <input type="text" placeholder="Search by title or author"/>
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                    {searchResults.map((id) => 
                        <li key={id}>
                            <Book shelfUpdater={shelfUpdater} id={id} />
                        </li>
                    )}
                </ol>
              </div>
            </div>
        )
    }
}

export default Search;