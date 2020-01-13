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
    currentPage: 0
  };

  componentDidMount = () => {
    instance.get().then(response => {
      const data = response.data;
      this.setState({ data });
    });
  };

  pageChangeHandler = ({ selected }) =>
    this.setState({ currentPage: selected });

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

  chunkArray = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );

  render() {
    const { data } = this.state;

    const visibleData = this.chunkArray(data, 20);
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
            <Table data={data} />
            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={5}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.pageChangeHandler}
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
          </div>
        </section>
      </main>
    );
  }
}
