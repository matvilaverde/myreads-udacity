import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class EachShelf extends Component {
    render() {
        const { title, which, shelfUpdater  } = this.props
        
        return(
          <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
              {/*
                  Iterates through the array and renders each book 
              */}
                {which.map((id) => 
                    <li key={id}>
                        <Book shelfUpdater={shelfUpdater} id={id}/>
                    </li>
                )}
              </ol>
            </div>
          </div>
        )
    }
}

EachShelf.propTypes = {
  shelfUpdater: PropTypes.func.isRequired
}

export default EachShelf;