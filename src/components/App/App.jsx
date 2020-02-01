import React, { Component } from "react";
// import PropTypes from "prop-types";

import ReactPaginate from "react-paginate";
import "./App.scss";
import Table from "../Table/Table";
import SearchForm from "../Search/Search";
import Select from "../Select/Select";
import Rocket from "../Rocket/Rocket";
import Dragon from "../Dragon/Dragon";
import { Loader } from "../Loader/Loader";

import { request } from "../../requests/request";
import falcon1 from "../../images/falcon1.jpg";
import falcon9 from "../../images/falcon9.jpg";
import falconH from "../../images/falconH.jpg";
import starship from "../../images/starship.png";
import dragon1 from "../../images/dragon1.jpg";
import dragon2 from "../../images/dragon2.jpg";

export default class App extends Component {
  state = {
    primaryData: [],
    data: [],
    offset: 0,
    perPage: 20,
    currentPage: 0,
    sort: "desc",
    loadingRockets: true,
    loadingLaunches: true,
    errorMessage: ""
  };

  componentDidMount = () => {
    this.getLaunchesData();
  };

  getLaunchesData = async () => {
    try {
      const response = await request.get("/launches", {
        params: { order: "desc" }
      });

      const primaryData = response.data;

      const data = response.data.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );

      this.setState({
        primaryData: primaryData,
        loadingRockets: false,
        loadingLaunches: false,
        data: data,
        pageCount: Math.ceil(response.data.length / this.state.perPage)
      });
    } catch (error) {
      if (error.response.status === 500) {
        this.setState({
          errorMessage: error.message
        });
      }
    }

    // const filteredData = response.data.filter(item => {
    //   return item.launch_success !== null && item.details !== null;
    // });
  };

  // sorting
  sortDesc = async () => {
    try {
      const response = await request.get("/launches", {
        params: { order: "desc" }
      });
      const data = response.data.slice(0, this.state.perPage);
      this.setState({ loadingLaunches: false, data: data });
    } catch (error) {
      if (error.response.status === 500) {
        this.setState({
          errorMessage: error.message
        });
      }
    }
  };

  sortAsc = async () => {
    try {
      const response = await request.get("/launches", {
        params: { order: "asc" }
      });
      const data = response.data.slice(0, this.state.perPage);
      this.setState({ loadingLaunches: false, data: data });
    } catch (error) {
      if (error.response.status === 500) {
        this.setState({
          errorMessage: error.message
        });
      }
    }
  };

  handleSorting = () => {
    const sort = this.state.sort === "asc" ? "desc" : "asc";
    this.setState({ sort: sort, currentPage: 0, loadingLaunches: true });
    sort === "asc" ? this.sortAsc() : this.sortDesc();
  };

  // renew table when display value changes
  handleValue = async value => {
    this.setState({
      perPage: value,
      currentPage: 0,
      loadingLaunches: true
    });
    try {
      const response = await request.get("/launches", {
        params: { order: "desc" }
      });

      const data = response.data.slice(0, this.state.perPage);

      this.setState({
        loadingLaunches: false,
        data: data,
        pageCount: Math.ceil(response.data.length / this.state.perPage)
      });
    } catch (error) {
      if (error.response.status === 500) {
        this.setState({
          errorMessage: error.message
        });
      }
    }
  };

  // pagination
  setElementsForCurrentPage = async () => {
    try {
      const response = await request.get("/launches", {
        params: {
          order: this.state.sort,
          offset: this.state.offset
        }
      });

      const data = response.data.slice(0, this.state.perPage);

      this.setState({ data: data, loadingLaunches: false });
    } catch (error) {
      if (error.response.status === 500) {
        this.setState({
          errorMessage: error.message
        });
      }
    }
  };

  handlePageClick = data => {
    const selectedPage = data.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState({ currentPage: selectedPage, offset: offset }, () => {
      this.setElementsForCurrentPage();
    });
  };

  // searching callback
  updateElements = filteredData => {
    const data = filteredData.slice(0, this.state.perPage);
    this.setState({
      data: data,
      pageCount: Math.ceil(filteredData.length / this.state.perPage)
    });
  };

  render() {
    const {
      data,
      sort,
      loadingLaunches,
      loadingRockets,
      primaryData
    } = this.state;
    return (
      <main>
        <section className="dragons">
          <div className="container">
            <h2 className="section-title">SpaceX dragons</h2>
            <div className="items">
              <Dragon id="dragon1" imgSrc={dragon1} videoId="kbivNwbD9to" />
              <Dragon id="dragon2" imgSrc={dragon2} videoId="2ZL0tbOZYhE" />
            </div>
          </div>
        </section>
        <section className="rockets">
          <div className="container">
            <h2 className="section-title">SpaceX rockets</h2>
            <div className="items">
              {this.state.errorMessage && (
                <div className="error">
                  <b>500 internal server error</b> <br />
                  We are working towards creating something better. We won't be
                  long:)
                </div>
              )}
              {loadingRockets ? (
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

              <Select handleValue={this.handleValue} options={[20, 30, 40]} />
            </div>
            {this.state.errorMessage && (
              <div className="error">
                <b>500 internal server error</b> <br />
                We are working towards creating something better. We won't be
                long:)
              </div>
            )}

            <Table
              data={data}
              handleSorting={this.handleSorting}
              sort={sort}
              loadingLaunches={loadingLaunches}
            />
            {loadingLaunches ? (
              <Loader />
            ) : (
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
            )}
          </div>
        </section>
      </main>
    );
  }
}
