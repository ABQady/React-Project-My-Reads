import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Shelf extends Component {

   static propTypes = {
      books: PropTypes.any.isRequired,
      title: PropTypes.string.isRequired
   }

   render() {
      const { books, title } = this.props

      return (
         <div className="bookshelf">
            {title.length > 0 && (<h2 className="bookshelf-title">{title}</h2>)}
            <div className="bookshelf-books">
               <ol className="books-grid">
                  {books.length > 0 && (
                     books.map((book) => (
                        <li key={book.id}>
                           <Book book={book} />
                        </li>
                     ))
                  )}
               </ol>
            </div>
         </div>
      )
   }
}

export default Shelf