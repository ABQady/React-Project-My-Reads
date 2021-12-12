import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import Search from './Search'
import { Link } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    wantToRead: [],
    currentlyReading: [],
    read: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  moveBook = (book, shelf) => {
    this.setState((currentState) => ({
      books: currentState.books.filter((c) => {
        return c.id !== book.id
      })
    }))

    shelf === 1 && this.setState((currentState) => ({
      wantToRead: currentState.wantToRead.concat([book])
    })) && BooksAPI.update(book.id, "wantToRead")

    shelf === 2 && this.setState((currentState) => ({
      currentlyReading: currentState.currentlyReading.concat([book])
    })) && BooksAPI.update(book.id, "currentlyReading")

    shelf === 3 && this.setState((currentState) => ({
      read: currentState.read.concat([book])
    })) && BooksAPI.update(book.id, "read")
  }

  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim()
    }))
  }
  render() {
    const { query } = this.state

    return (
      <div className="app">
        <div>
          <Routes>
            <Route exact path='/' element={
              < ListBooks
                books={this.state.books}
                wantToRead={this.state.wantToRead}
                currentlyReading={this.state.currentlyReading}
                read={this.state.read}
              />
            } />

            <Route path='/Search' element={
              <Search />
            } />
          </Routes>
        </div>
      </div>
    )
  }
}

export default BooksApp
