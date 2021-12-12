import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from './Book'

class ListBooks extends Component {

   static propTypes = {
      books: PropTypes.array.isRequired,
      wantToRead: PropTypes.array.isRequired,
      currentlyReading: PropTypes.array.isRequired,
      read: PropTypes.array.isRequired,
   }

   render() {
      const { books, wantToRead, currentlyReading, read } = this.props

      return (
         <div className="list-books">
            <div className="list-books-title">
               <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
               <div>
                  <div className="bookshelf">
                     <h2 className="bookshelf-title">Currently Reading</h2>
                     <div className="bookshelf-books">
                        <ol className="books-grid">
                           {currentlyReading.length > 0 && (
                              currentlyReading.map((book) => (
                                 <Book
                                    book={book}
                                 />
                              ))
                           )}
                        </ol>
                     </div>
                  </div>
               </div>

               <div>
                  <div className="bookshelf">
                     <h2 className="bookshelf-title">Want To Read</h2>
                     <div className="bookshelf-books">
                        <ol className="books-grid">
                           {wantToRead.length > 0 && (
                              wantToRead.map((book) => (
                                 <Book
                                    book={book}
                                 />
                              ))
                           )}
                        </ol>
                     </div>
                  </div>
               </div>

               <div>
                  <div className="bookshelf">
                     <h2 className="bookshelf-title">All Books</h2>
                     <div className="bookshelf-books">
                        <ol className="books-grid">
                           {books.length > 0 && (
                              books.map((book) => (
                                 <Book
                                    book={book}
                                 />
                              ))
                           )}
                        </ol>
                     </div>
                  </div>
               </div>

               <div>
                  <div className="bookshelf">
                     <h2 className="bookshelf-title">Read</h2>
                     <div className="bookshelf-books">
                        <ol className="books-grid">
                           {read.length > 0 && (
                              read.map((book) => (
                                 <Book
                                    book={book}
                                 />
                              ))
                           )}
                        </ol>
                     </div>
                  </div>
               </div>

               <Link to='/Search'>
                  <div className="open-search">
                     <button></button>
                  </div>
               </Link>

            </div>
         </div>
      )
   }
}
export default ListBooks