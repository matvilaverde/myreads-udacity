import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class SearchPage extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
    }

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({query})
    }

    clearQuery = () => {
        this.setState({query: ''})
    }
    
    render() {
        const { books } = this.props
        const { query } = this.state

        let showingBooks
        if(query) {
            const match = new RegExp(escapeRegExp(query), 'i') // i significa ignorar case
            showingBooks = books.filter((book) => match.test(book.title))
        } else {
            showingBooks = books
        }

        showingBooks.sort(sortBy('authors'));

        return (
            <div className="search-books">
                <div className="search-books-bar">
                <Link to='/'><button className="close-search">Close</button></Link>
                <div className="search-books-input-wrapper">
                    {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
    
                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <input type="text" placeholder="Search by title or author"
                    value={query}
                    onChange={(event) => (this.updateQuery(event.target.value))}/>
                    <button className="clear-query" onClick={this.clearQuery}></button>
    
                </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {showingBooks.map((book) => (
                            <li key={book.id}>
                                <div>
                                    <p>{book.title}</p>
                                    <p>{book.authors}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchPage;