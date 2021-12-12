import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import Search from './Search'
import { Route, Routes } from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: {},
    wantToRead: {},
    currentlyReading: {},
    read: {}
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
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

      })
  }

  // moveBook = (book, shelf) => {
  //   this.setState((currentState) => ({
  //     books: currentState.books.filter((c) => {
  //       return c.id !== book.id
  //     })
  //   }))

  //   shelf === 1 && this.setState((currentState) => ({
  //     wantToRead: currentState.wantToRead.concat([book])
  //   })) && BooksAPI.update(book.id, "wantToRead")

  //   shelf === 2 && this.setState((currentState) => ({
  //     currentlyReading: currentState.currentlyReading.concat([book])
  //   })) && BooksAPI.update(book.id, "currentlyReading")

  //   shelf === 3 && this.setState((currentState) => ({
  //     read: currentState.read.concat([book])
  //   })) && BooksAPI.update(book.id, "read")
  // }

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
              />
            } />

            <Route path='/Search' element={
              <Search books={books} />
            } />
          </Routes>
        </div>
      </div>
    )
  }
}

export default BooksApp
