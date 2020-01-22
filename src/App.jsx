import React, { Component } from "react";
// import PropTypes from "prop-types";

import ReactPaginate from "react-paginate";
import "./App.scss";
import Table from "./components/Table/Table";
import SearchForm from "./components/Search/Search";
import Rocket from "./components/Rocket/Rocket";
import { Loader } from "./components/Loader/Loader";

import { request } from "./requests/request";
import falcon1 from "./images/falcon1.jpg";
import falcon9 from "./images/falcon9.jpg";
import falconH from "./images/falconH.jpg";
import starship from "./images/starship.png";

export default class App extends Component {
  state = {
    primaryData: [],
    data: [],
    offset: 0,
    perPage: 20,
    currentPage: 0,
    sort: "desc",
    loading: true,
    initialPage: 0
  };

  componentDidMount = async () => {
    const response = await request.get("/launches", {
      params: { order: "desc" }
    });

    const primaryData = response.data;

    // const filteredData = response.data.filter(item => {
    //   return item.launch_success !== null && item.details !== null;
    // });

    const data = response.data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );

    this.setState({
      primaryData: primaryData,
      loading: false,
      data: data,
      pageCount: Math.ceil(response.data.length / this.state.perPage)
    });
  };

  setElementsForCurrentPage = async () => {
    const response = await request.get("/launches", {
      params: {
        order: this.state.sort,
        offset: this.state.offset
      }
    });

    const data = response.data.slice(0, this.state.perPage);

    this.setState({ data: data });
  };

  sortDesc = async () => {
    const response = await request.get("/launches", {
      params: { order: "desc" }
    });
    const data = response.data.slice(0, this.state.perPage);
    this.setState({ loading: false, data: data });
  };

  sortAsc = async () => {
    const response = await request.get("/launches", {
      params: { order: "asc" }
    });
    const data = response.data.slice(0, this.state.perPage);
    this.setState({ loading: false, data: data });
  };

  handleSorting = () => {
    const sort = this.state.sort === "asc" ? "desc" : "asc";
    this.setState({ sort: sort, currentPage: 0 });
    sort === "asc" ? this.sortAsc() : this.sortDesc();
  };

  handlePageClick = data => {
    const selectedPage = data.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState({ currentPage: selectedPage, offset: offset }, () => {
      this.setElementsForCurrentPage();
    });
  };

  updateElements = filteredData => {
    const data = filteredData.slice(0, this.state.perPage);
    this.setState({
      data: data,
      pageCount: Math.ceil(filteredData.length / this.state.perPage)
    });
  };

  render() {
    const { data, sort, loading, primaryData } = this.state;
    return (
      <main>
        <section className="rockets">
          <div className="container">
            <h2 className="section-title">SpaceX rockets</h2>
            <div className="rockets__items">
              {loading ? (
                <Loader />
              ) : (
                <>
                  <Rocket id="falcon1" imgSrc={falcon1} videoId="YMvQsmLv44o" />
                  <Rocket id="falcon9" imgSrc={falcon9} videoId="nxSxgBKlYws" />
                  <Rocket
                    id="falconheavy"
                    imgSrc={falconH}
                    videoId="wbSwFU6tY1c"
                  />
                  <Rocket
                    id="starship"
                    imgSrc={starship}
                    videoId="C8JyvzU0CXU"
                  />
                </>
              )}
            </div>
          </div>
        </section>
        <section className="launch">
          <div className="container">
            <h1 className="section-title">SpaceX launches</h1>
            <div className="launch__top">
              <SearchForm
                primaryData={primaryData}
                updateElements={this.updateElements}
              />
            </div>
            {loading ? (
              <Loader />
            ) : (
              <>
                <Table
                  data={data}
                  handleSorting={this.handleSorting}
                  sort={sort}
                />

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
              </>
            )}
          </div>
        </section>
      </main>
    );
  }
}
