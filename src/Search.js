import React, { Component } from "react"
import BooksApp from "./App"
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'


class Search extends Component {

   state = {
      query: ''
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
      const { query } = this.state

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
                     }}
                  />
               </div>
            </div>
            <div className="search-books-results">
               <div className='title'>
                  <span> Now showing { } of { }</span>
                  <button onClick={this.clearQuery}>Clear</button>
               </div>
               <ol className="books-grid"></ol>
            </div>
         </div>
      )
   }
}

export default Search