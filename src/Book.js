import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

class Book extends Component {
    //Each state element needed is called right away and gets updated when the app mounts them 
    state = {
        id: this.props.id,
        title: '',
        authors: [''],
        imageLinks: {smallThumbnail: ''},
        shelf: 'none'
    }

    //Through the get method, uses only each book id to create it and render other elements in itself
    componentDidMount() {
        BooksAPI.get(this.props.id).then(response =>
            this.setState(response)
        )
    }

    /*
        Sets this book shelf to the new one and calls API update to do it on server;
        shelfUpdater is using the below select's value to update itself on the array
    */
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
                    {/*
                        Select has the shelf value and calls the function on change, so it will
                        always show the correct shelf and change when another is selected
                    */}
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
                {/*
                    Mention of honor to the div that helped me a lot on tests
                    and getting to the final result of the app:
                    
                    <div className="book-title">{this.state.id}</div>
                */}
            </div>
        )
    }
}

Book.propTypes = {
    shelfUpdater: PropTypes.func.isRequired
}

export default Book;