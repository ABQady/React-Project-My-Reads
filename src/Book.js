import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class Book extends Component {

   static propTypes = {
      book: PropTypes.object.isRequired
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
      const { book } = this.props

      const thumbnail =
         book.imageLinks && book.imageLinks.thumbnail
            ? book.imageLinks.thumbnail
            : "";

      return (

         <div className="book">
            <div className="book-top">
               <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}></div>
               <div className="book-shelf-changer">
                  <select>
                     <option value="move" disabled>Move to...</option>
                     <option value="currentlyReading">Currently Reading</option>
                     <option value="wantToRead">Want to Read</option>
                     <option value="read">Read</option>
                     <option value="none">None</option>
                  </select>
               </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
         </div>


      )
   }
}

export default Book