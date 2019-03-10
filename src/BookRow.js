import React, { Component } from "react";

class BookRow extends Component {
  render() {
    const book = this.props.book;
    const author = this.props.author;
    const authorsList = book.authors.map(author => <p>{author.name}</p>);
    return (
      <tr>
        <td>{book.title}</td>
        <td>{authorsList}</td>
        <td>
          <button className="btn" style={{ backgroundColor: book.color }} />
        </td>
      </tr>
    );
  }
}

export default BookRow;
