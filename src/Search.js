import React, { Component } from "react"
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Shelf from "./Shelf"

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
                  {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
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
               {/* <div className="books-grid"> */}

               {apiResult.length > 0 && query.length > 0 && (
                  <div className="list-books-content">
                     <h2 className="bookshelf-title">{`Search Result: ${apiResult.length}`}</h2>
                     <Shelf books={this.state.apiResult} title={``} moveBook={moveBook} />
                  </div>
               )}

               {error && (<h3>No books found ...</h3>)}

            </div>
         </div >
      )
   }
}

export default Search