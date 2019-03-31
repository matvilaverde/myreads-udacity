import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
//import escapeRegExp from 'escape-string-regexp';
//import * as BooksAPI from './BooksAPI'

class SearchPage extends Component {
    render() {
        const { query, updateQuery } = this.props

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author"
                        value={query}
                        onChange={(event) => (updateQuery(event.target.value))}/>
                        <button className="clear-query" onClick={this.clearQuery}></button>
                    </div>
                </div>
            </div>
        )
    }
}

SearchPage.propTypes = {
    query: PropTypes.string.isRequired,
    updateQuery: PropTypes.func.isRequired,
    updateShelf: PropTypes.func.isRequired
}

export default SearchPage;