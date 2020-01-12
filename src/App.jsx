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
    data: []
  };

  componentDidMount() {
    axios.get(instance.defaults.baseURL).then(response => {
      const data = response.data;
      this.setState({ data });
    });
  }

  render() {
    const { data } = this.state;
    return (
      <main>
        <section className="launch">
          <div className="container">
            <h1 className="launch__title">SpaceX launches</h1>
            <Table data={data} />
            <ReactPaginate
              previousLabel={"Prev"}
              nextLabel={"Next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={4}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              nextClassName="page-item"
              previousLinkClassName="page-link"
              nextLinkClassName="page-link"
            />
          </div>
        </section>
      </main>
    );
  }
}
