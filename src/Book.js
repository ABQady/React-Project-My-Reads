import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Control from './Control'

class Book extends Component {

   static propTypes = {
      book: PropTypes.object.isRequired,
      books: PropTypes.array.isRequired,
      moveBook: PropTypes.func.isRequired
   }

   updateBook = (book) => {
      BooksAPI.get(book.id)
         .then((data) => {
            this.setState(() => ({
               data
            }))
         })
   }

   render() {
      const { book, books, moveBook } = this.props

      const thumbnail =
         book.imageLinks && book.imageLinks.thumbnail
            ? book.imageLinks.thumbnail
            : "";
      const title = book.title ? book.title : "No title";
      const authors = book.authors ? book.authors : "No authors"

      return (
         <div className="book">
            <div className="book-top">
               <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}></div>
               <Control book={book} books={books} moveBook={moveBook} />
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authors}</div>
         </div>
      )
   }
}

export default Book