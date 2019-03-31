import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

class Book extends Component {
    state = {
        id: this.props.id,
        title: '',
        authors: [''],
        imageLinks: {smallThumbnail: ''},
        shelf: 'none'
    }

    componentDidMount() {
        BooksAPI
          .get(this.props.id)
          .then(response => this.setState(response))
        console.log('BookComponent did mount, state was set based on get(book), for each book.')
    }

    handleChange = (event) => {
        let newShelf=event.target.value
        let previousShelf=this.state.shelf  // so we can rollback the change later if API call fails
        this.setState({shelf: newShelf})   // hoping API call won't fail
        BooksAPI
          .update({'id': this.state.id}, newShelf)   // API call
          .then((shelvesObject) => this.props.updateShelf(shelvesObject))
          // NB this updates the currentlyReading, read and wantToRead shelves, but not the searchResults shelf.
          // This is why we had to do this.setState({shelf: newShelf}) a few lines earlier to manually upate the shelf state of this book
          // so that the book status is shown correctly in the searchResults shelf
          .catch(() => (this.setState({shelf: previousShelf})))        // rollback if API call failed
      }
    
    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.state.imageLinks.smallThumbnail})`}}></div>
                    <div className="book-shelf-changer">
                        <select value={this.state.shelf} onChange={this.handleChange}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.state.title}</div>
                <div className="book-authors">{this.state.authors}</div>
                <div className="book-title">{this.state.shelf}</div>
            </div>
        )
    }
}

Book.propTypes = {
    id: PropTypes.string.isRequired,
  }

export default Book;