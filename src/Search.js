import React, { Component } from "react"
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

class Search extends Component {

   static propTypes = {
      books: PropTypes.array.isRequired,
      moveBook: PropTypes.func.isRequired
   }

   state = {
      query: '',
      apiResult: [],
      error: false
   }

   updateQuery = (query) => {
      this.setState(() => ({
         query
      }))
   }

   performSearch = event => {
      const query = event.target.value
      this.updateQuery(query)

      if (query.length > 0) {
         BooksAPI.search(query.trim(), 20).then(books => {
            books && (
               books.length > 0
                  ? this.setState({ apiResult: books, error: false })
                  : this.setState({ apiResult: [], error: true })
            )
         })
      } else this.setState({ apiResult: [], error: false, query: '' })
   }

   render() {
      const { query, apiResult, error } = this.state
      const { books, moveBook } = this.props

      return (
         <div className="search-books">
            <div className="search-books-bar">
               <Link className="close-search" to="/">Close</Link>
               <div className="search-books-input-wrapper">
                  <input
                     className='search-string'
                     type="text"
                     placeholder="Search by title or author"
                     value={query}
                     onChange={this.performSearch}
                  />
               </div>
            </div>

            <div className="search-books-results">
               {apiResult.length > 0 && query.length > 0 && (
                  <div className="list-books-content">
                     <h2 className="bookshelf-title">{`Search Result: ${apiResult.length}`}</h2>
                     <div className="bookshelf">
                        <div className="bookshelf-books">
                           <ol className="books-grid">
                              {apiResult.length > 0 && (
                                 apiResult.map((book) => (
                                    <li key={book.id}>
                                       <Book book={book} books={books} moveBook={moveBook} />
                                    </li>
                                 ))
                              )}
                           </ol>
                        </div>
                     </div>
                  </div>
               )}

               {error && (<h3>No books found ...</h3>)}

            </div>
         </div >
      )
   }
}

export default Search