import React, { Component } from "react";

import ReactPaginate from "react-paginate";
import "./Launches.scss";
import Section from "../Section/Section";
import Title from "../Title/Title";
import Table from "../Table/Table";
import SearchForm from "../Search/Search";
import Select from "../Select/Select";
import Hint from "../Hint/Hint";

// import  Loader from "../Loader/Loader";
import { request } from "../../requests/request";

import star from "../../images/icons/star.png";
import swipe from "../../images/icons/swipe.svg";

export default class App extends Component {
  state = {
    primaryData: [],
    data: [],
    offset: 0,
    perPage: 20,
    currentPage: 0,
    sort: "desc",
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
    this.setState(
      { currentPage: selectedPage, offset: offset, loadingLaunches: true },
      () => {
        this.setElementsForCurrentPage();
      }
    );
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
    const { data, sort, loadingLaunches, primaryData } = this.state;
    return (
      <main className="main">
        <Section className="launch">
          <Title>SpaceX launches</Title>
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
          <div className="launch__wrapper">
            <Table
              data={data}
              handleSorting={this.handleSorting}
              sort={sort}
              loadingLaunches={loadingLaunches}
            />
          </div>

          <div className="table-addition">
            <Hint className="hint_mod" imageSrc={star} imageAlt="asterisk">
              &nbsp; — click to expand more information about the launch
            </Hint>

            <Hint
              className="d-sm-block d-md-none"
              imageSrc={swipe}
              imageAlt="icon-swipe"
            >
              &nbsp; — swipe the table to the left
            </Hint>
          </div>
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
        </Section>
      </main>
    );
  }
}
