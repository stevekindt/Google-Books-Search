import React, { Component } from "react";
import { Row, Container } from "../components/Grid";
import { BookList, BookListItem } from "../components/BookList";
import API from "../utils/API";

class Saved extends Component {

  state = {
    savedBooks: [],
    screenWidth: window.innerWidth
  }

  componentDidMount() {
    this.loadSavedBooks();
    window.addEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    this.setState({screenWidth: window.innerWidth}, () => console.log(this.state.screenWidth))
  }

  loadSavedBooks = () => {
    API.getSavedBooks()
      .then(res =>
        this.setState({ savedBooks: res.data }))
  }

  deleteSavedBook = (event, bookId) => {
    event.preventDefault();
    API.deleteSavedBook(bookId)
      .then(res => this.loadSavedBooks())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container>
        <Row>
          <div className="col rounded text-center bg-info mt-4 mb-4 p-4">
            <h1>Saved Books</h1>
          </div>
        </Row>
        <Row>
          <div className="col border border-rounded p-3 mb-4">
            <h4>Saved Books</h4>
            {!this.state.savedBooks.length ? (
              <h6 className="text-center">No books saved to display</h6>
            ) : (
                <BookList>
                  {this.state.savedBooks.map(book => {
                    return (
                      <BookListItem
                        key={book.bookId}
                        bookId={book.bookId}
                        title={book.title}
                        authors={book.authors}
                        description={book.description}
                        image={book.image}
                        link={book.link}
                        saved={true}
                        clickEvent={this.deleteSavedBook}
                        screenWidth={this.state.screenWidth}
                      />
                    );
                  })}
                </BookList>
              )}
          </div>
        </Row>
      </Container>
    )
  }
}

export default Saved;
