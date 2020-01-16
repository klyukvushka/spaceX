import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import "./App.scss";
import Table from "./Table";
import SearchForm from "./Search";
import Rocket from "./Rocket";
import { instance } from "./axios-instance";

export default class App extends Component {
  state = {
    data: [],
    offset: 0,
    elements: [],
    perPage: 30,
    currentPage: 0
  };

  componentDidMount = async () => {
    const response = await instance.get("/launches");
    this.setState(
      {
        data: response.data,
        pageCount: Math.ceil(response.data.length / this.state.perPage)
      },
      () => this.setElementsForCurrentPage()
    );
  };

  setElementsForCurrentPage() {
    const elements = this.state.data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );

    this.setState({ elements: elements });
  }

  sortDesc = async () => {
    const response = await instance.get("/launches", {
      params: { order: "desc" }
    });
    const data = response.data;
    this.setState({ data }, () => this.setElementsForCurrentPage());
  };

  sortAsc = async () => {
    const response = await instance.get("/launches", {
      params: { order: "asc" }
    });
    const data = response.data;
    this.setState({ data }, () => this.setElementsForCurrentPage());
  };

  handlePageClick = elements => {
    const selectedPage = elements.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState({ currentPage: selectedPage, offset: offset }, () => {
      this.setElementsForCurrentPage();
    });
  };

  updateElements = filteredData => {
    this.setState(
      {
        elements: filteredData,
        pageCount: Math.ceil(filteredData.length / this.state.perPage)
      },
      () => {
        this.setElementsForCurrentPage();
      }
    );
  };

  render() {
    const { elements } = this.state;
    const { data } = this.state;
    return (
      <main>
        <section className="rockets">
          <div className="container">
            <h2 className="rockets__title">SpaceX rockets</h2>
            {/* <Rocket /> */}
          </div>
        </section>
        <section className="launch">
          <div className="container">
            <h1 className="launch__title">SpaceX launches</h1>
            <div className="launch__top">
              <div className="launch__group">
                <button onClick={this.sortDesc} className="btn">
                  Sort ↓
                </button>
                <button onClick={this.sortAsc} className="btn btn-asc">
                  Sort ↑
                </button>
              </div>
              <SearchForm data={data} updateElements={this.updateElements} />
            </div>

            <Table data={elements} />
            {this.state.pageCount > 1 ? (
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
            ) : null}
          </div>
        </section>
      </main>
    );
  }
}
