import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'

class ListBooks extends Component {

   static propTypes = {
      books: PropTypes.any.isRequired,
      wantToRead: PropTypes.any.isRequired,
      currentlyReading: PropTypes.any.isRequired,
      read: PropTypes.any.isRequired,
      moveBook: PropTypes.func.isRequired
   }

   render() {
      const { books, wantToRead, currentlyReading, read, moveBook } = this.props

      return (
         <div className="list-books">
            <div className="list-books-title">
               <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
               <Shelf books={currentlyReading} title="Currently Reading" moveBook={moveBook} />
               <Shelf books={wantToRead} title="Want To Read" moveBook={moveBook} />
               <Shelf books={read} title="Read" moveBook={moveBook} />
               <Shelf books={books} title="Library" moveBook={moveBook} />
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