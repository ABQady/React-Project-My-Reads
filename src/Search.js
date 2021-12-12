import React, { Component } from "react"
import BooksApp from "./App"
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class Search extends Component {

   static propTypes = {
      books: PropTypes.array.isRequired
   }
   state = {
      query: '',
      apiResult: []
   }

   updateQuery = (query) => {
      this.setState(() => ({
         query: query.trim()
      }))
   }

   clearQuery = () => {
      this.updateQuery('')
   }

   render() {
      const { books } = this.props
      const { query, apiResult } = this.state

      const result = query === ''
         ? apiResult
         : apiResult.filter((c) => (
            c.author.toLowerCase().includes(query.toLowerCase())
         ))
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
                     onChange={(event) => {
                        this.updateQuery(event.target.value)
                        BooksAPI.search(query)
                           .then((apiResult) => {
                              this.setState(() => ({
                                 apiResult
                              }))
                           })
                     }}
                  />
               </div>
            </div>
            <div className="search-books-results">
               <div className='title'>
                  <span> Now showing {result.length} of {books.length}</span>
                  <button onClick={this.clearQuery}>Clear</button>
               </div>
               <ol className="books-grid"></ol>
            </div>
         </div>
      )
   }
}

export default Search