import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import Search from './Search'
import { Route, Routes } from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
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
        this.refreshBooks()
      })
  }

  refreshBooks() {
    this.setState((currentState) => ({
      wantToRead: currentState.books.filter((c) => {
        return c.shelf === "wantToRead"
      })
    }))
    this.setState((currentState) => ({
      currentlyReading: currentState.books.filter((c) => {
        return c.shelf === "currentlyReading"
      })
    }))
    this.setState((currentState) => ({
      read: currentState.books.filter((c) => {
        return c.shelf === "read"
      })
    }))
  }

  moveBook = (targetBook, shelf) => {
    BooksAPI.update(targetBook, shelf)
      .then(response => {
        targetBook.shelf = shelf

        this.setState(currentState => ({
          books: currentState.books
            .filter(book => book.id !== targetBook.id)
            .concat(targetBook)
        }))
        this.refreshBooks()
      })
  }

  render() {
    const { books, wantToRead, currentlyReading, read } = this.state

    return (
      <div className="app">
        <div>
          <Routes>
            <Route exact path='/' element={
              < ListBooks
                books={books}
                wantToRead={wantToRead}
                currentlyReading={currentlyReading}
                read={read}
                moveBook={this.moveBook}
              />
            } />

            <Route path='/Search' element={
              <Search
                books={books}
                moveBook={this.moveBook} />
            } />
          </Routes>
        </div>
      </div>
    )
  }
}

export default BooksApp
