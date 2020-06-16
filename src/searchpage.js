import React, { Component } from "react";
import "./App.css";
import { search, update } from "./BooksAPI";
import { Link } from "react-router-dom";

class SearchPage extends Component {
  state = {
    searchFeild: "",
    searchBooks: [],
    books: [],
    optionSelected: "",
  };
  selectChange = (value, book) => {
    this.setState({ optionSelected: value.target.value }, () => {
      update(book, this.state.optionSelected);
    });
  };

  componentDidMount() {
    const appBooks = this.props.AppBooks;
    console.log(appBooks)
    if (appBooks) {
      this.setState(
        {
          books: [
            ...appBooks.read,
            ...appBooks.wantToRead,
            ...appBooks.currentlyReading,
          ],
        },
        () => {
          console.log(this.state.books);
        }
      );
    }
  }
  clearBooks = () => {
    if (this.state.searchValue === "") {
      this.setState({ searchBooks: [] });
      return;
    }
  };
  render() {
    const TextChangeEvent = (event) => {
      this.setState(
        {
          searchValue: event.target.value,
        },
        () => {
          this.clearBooks();
          search(this.state.searchValue)
            .then((res) => {
              if (res && !res.error) {
                this.filtered = res.map((book) => {
                  const check = this.state.books.find(
                    (Checkbook) => Checkbook.id === book.id
                  );
                  if (check) {
                    return { ...book, shelf: check.shelf };
                  } else {
                    return { ...book, shelf: "none" };
                  }
                });
              } else {
                this.filtered = [];
              }

              this.setState({ searchBooks: this.filtered }, () => {
                this.clearBooks();
              });
            })
            .catch((err) => {
              console.log(err);
              this.setState({ searchBooks: [] });
            });
        }
      );
    };
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={TextChangeEvent}
              value={this.state.searchValue}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchBooks.length !== 0 ? (
              this.state.searchBooks.map((book) => {
                return (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div
                          className="book-cover"
                          style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${
                              book.imageLinks && book.imageLinks.smallThumbnail
                            })`,
                          }}
                        />
                        <div className="book-shelf-changer">
                          <select
                            onChange={(event) => this.selectChange(event, book)}
                            value={book.shelf}
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
                      {book.authors &&
                        book.authors.map((author) => (
                          <div key={author} className="book-authors">
                            {author}
                          </div>
                        ))}
                    </div>
                  </li>
                );
              })
            ) : (
              <h1>No books found</h1>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
