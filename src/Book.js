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
        BooksAPI.get(this.props.id).then(response =>
            this.setState(response)
        )
    }

    shelfChanger = (event) => {
        let newShelf = event.target.value
        this.setState({shelf: newShelf})
        BooksAPI.update({id: this.state.id}, newShelf).then((controller) => {
            this.props.shelfUpdater(controller);
        })
    }

    render() {

        const { imageLinks, shelf, title, authors } = this.state

        return(
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageLinks.smallThumbnail})` }}></div>
                    <div className="book-shelf-changer">
                        <select value={shelf} onChange={this.shelfChanger}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors}</div>
                <div className="book-title">{this.state.id}</div>
            </div>
        )
    }
}

Book.propTypes = {
    shelfUpdater: PropTypes.func.isRequired
}

export default Book;