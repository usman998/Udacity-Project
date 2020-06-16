import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { getAll, update } from "./BooksAPI";

class Shelf extends Component {
  state = {
    optionSelected: "",
    currentlyReading: [],
    wantToRead: [],
    read: [],
    allBooks: [],
  };
  selectChange = (e, book) => {
    this.setState({ optionSelected: e.target.value }, () => {
      const { allBooks, optionSelected } = this.state;
      this.setState(
        {
          allBooks: allBooks.map((oldBook) =>
            oldBook.id === book.id
              ? { ...oldBook, shelf: optionSelected }
              : oldBook
          ),
        },
        () => {
          this.filterBooks(this.state.allBooks);
        }
      );

      update(book, this.state.optionSelected).catch((err) => {
        return <h1>{err}</h1>;
      });
    });
  };
  getBooks = () => {
    getAll().then((res) => {
      this.setState(
        {
          allBooks: res,
        },
        () => {
          this.filterBooks(this.state.allBooks);
        }
      );
    });
  };
  filterBooks = (newBook) => {
    this.setState({
      currentlyReading: newBook.filter(
        (book) => book.shelf === "currentlyReading"
      ),
      wantToRead: newBook.filter((book) => book.shelf === "wantToRead"),
      read: newBook.filter((book) => book.shelf === "read"),
    });
  };
  componentDidMount() {
    this.getBooks();
  }

  render() {
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
                  {this.state.currentlyReading.map((book) => (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage: `url(${book.imageLinks &&
                                book.imageLinks.thumbnail})`,
                            }}
                          />
                          <div className="book-shelf-changer">
                            <select
                              value="currentltyReading"
                              onChange={(event) =>
                                this.selectChange(event, book)
                              }
                            >
                              <option value="move" disabled>
                                Move to...
                              </option>
                              <option value="currentlyReading">
                                Currently Reading
                              </option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.state.wantToRead.map((book) => (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage: `url(${book.imageLinks &&
                                book.imageLinks.thumbnail})`,
                            }}
                          />
                          <div className="book-shelf-changer">
                            <select
                              value="wantToRead"
                              onChange={(event) =>
                                this.selectChange(event, book)
                              }
                            >
                              <option value="move" disabled>
                                Move to...
                              </option>
                              <option value="currentlyReading">
                                Currently Reading
                              </option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.state.read.map((book) => (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 192,
                              backgroundImage: `url(${book.imageLinks &&
                                book.imageLinks.thumbnail})`,
                            }}
                          />
                          <div className="book-shelf-changer">
                            <select
                              value="read"
                              onChange={(event) =>
                                this.selectChange(event, book)
                              }
                            >
                              <option value="move" disabled>
                                Move to...
                              </option>
                              <option value="currentlyReading">
                                Currently Reading
                              </option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <Link to="/search">
          <div className="open-search">
            <button>Add a book</button>
          </div>
        </Link>
      </div>
    );
  }
}
export default Shelf;
