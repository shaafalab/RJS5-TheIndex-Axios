import React, { Component } from "react";

// Components
import Sidebar from "./Sidebar";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";
import axios from "axios";
import Loading from "./Loading";
class App extends Component {
  state = {
    currentAuthor: null,
    filteredAuthors: [],
    authors: [],
    loading: true
  };

  componentDidMount = () => {
    this.getapi();
  };

  selectAuthor = async author => {
    try {
      const api = await axios.get(
        `https://the-index-api.herokuapp.com/api/authors/${author.id}`
      );
      const authorFromAPI = api.data;
      this.setState({ currentAuthor: authorFromAPI, loading: false });
    } catch (error) {
      console.error("somthing in books went worng");
      console.error(error);
    }
  };

  unselectAuthor = () => this.setState({ currentAuthor: null });

  getapi = async () => {
    try {
      const api = await axios.get(
        "https://the-index-api.herokuapp.com/api/authors/"
      );
      const authors = api.data;
      this.setState({
        authors: authors,
        filteredAuthors: authors,
        loading: false
      });
    } catch (error) {
      console.error("somthing went worng");
      console.error(error);
    }
  };

  filterAuthors = query => {
    query = query.toLowerCase();
    let filteredAuthors = this.state.authors.filter(author => {
      return `${author.first_name} ${author.last_name}`
        .toLowerCase()
        .includes(query);
    });
    this.setState({ filteredAuthors: filteredAuthors });
  };

  getContentView = () => {
    if (this.state.currentAuthor) {
      return <AuthorDetail author={this.state.currentAuthor} />;
    } else {
      return (
        <AuthorsList
          authors={this.state.filteredAuthors}
          selectAuthor={this.selectAuthor}
          filterAuthors={this.filterAuthors}
        />
      );
    }
  };

  render() {
    if (this.state.loading) return <Loading />;
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar unselectAuthor={this.unselectAuthor} />
          </div>
          <div className="content col-10">{this.getContentView()}</div>
        </div>
      </div>
    );
  }
}

export default App;
