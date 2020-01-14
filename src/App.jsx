import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import "./App.scss";
import Table from "./table";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.spacexdata.com/v3/launches"
});

export default class App extends Component {
  state = {
    data: [],
    offset: 0,
    elements: [],
    perPage: 20,
    currentPage: 0
  };

  componentDidMount = () => {
    instance.get().then(response => {
      this.setState(
        {
          data: response.data,
          pageCount: Math.ceil(response.data.length / this.state.perPage)
        },
        () => this.setElementsForCurrentPage()
      );
    });
  };

  setElementsForCurrentPage() {
    let elements = this.state.data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );

    this.setState({ elements: elements });
  }

  sortDesc = () => {
    instance.get("?order=desc").then(response => {
      const data = response.data;
      this.setState({ data });
    });
  };

  sortAsc = () => {
    instance.get("?order=asc").then(response => {
      const data = response.data;
      this.setState({ data });
    });
  };

  handlePageClick = data => {
    const selectedPage = data.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState({ currentPage: selectedPage, offset: offset }, () => {
      this.setElementsForCurrentPage();
    });
  };

  render() {
    const { elements } = this.state;
    let paginationElement;
    if (this.state.pageCount > 1) {
      paginationElement = (
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          nextClassName="page-item"
          previousLinkClassName="page-link"
          nextLinkClassName="page-link"
          forcePage={this.state.currentPage}
        />
      );
    }

    return (
      <main>
        <section className="launch">
          <div className="container">
            <h1 className="launch__title">SpaceX launches</h1>
            <button onClick={this.sortDesc} className="launch__button">
              Sort ↓
            </button>
            <button
              onClick={this.sortAsc}
              className="launch__button launch__button_asc"
            >
              Sort ↑
            </button>
            <Table data={elements} />
            {paginationElement}
          </div>
        </section>
      </main>
    );
  }
}
