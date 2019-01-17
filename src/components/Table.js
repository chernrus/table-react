import React,  { Component } from 'react';
import Filter from './Filter';
import Pagination from "react-js-pagination";
import UserProfile from "./UserProfile";

const totalElementsOnPage = 20;

class Table extends Component {
  constructor() {
    super();

    this.state = {
      sortedData: null,
      filter: '',
      sortField: '',
      sortDirection: -1,
      page: 1,
      offset: 0
    }

    this.changePage = this.changePage.bind(this);

    this.onFilterChange = this.onFilterChange.bind(this);
    this.showUserProfile = this.showUserProfile.bind(this);
  }

  sortTableColumn = (column) => {
    let { sortField, sortDirection, sortedData } = this.state;
    const { data } = this.props;

    if(column === sortField) {
      sortedData.reverse();
      this.setState({
        sortedData,
        sortDirection: -1*sortDirection,
        page: 1,
        offset: 0
      });
    }
    else {
      sortedData = data.sort((a, b) => {
        if (a[column] < b[column]) return -1;
        if (a[column] > b[column]) return 1;
        return 0;
      })
      this.setState({
        sortedData,
        sortField: column,
        sortDirection: 1,
        page: 1,
        offset: 0
      });
    }
  }

  changePage(page) {
    this.setState({ page, offset: totalElementsOnPage*(page-1) });
  }

  onFilterChange(filterString) {
    this.setState({
      filter: filterString,
      page: 1,
      offset: 0
    });
  }

  showUserProfile(userData) {
    this.setState({ userProfile: userData });
  }

  render() {
    const { data } = this.props,
      { offset,
        sortField,
        sortDirection,
        userProfile
      } = this.state,
      sortedData = this.state.sortedData || data,
      filteredData = sortedData.filter(dataItem => {
        return Object.values(dataItem).toString().toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1;
      });

    return (
      <div className="Table-container">
        <Filter onFilterChange={this.onFilterChange} />
        <table>
          <thead>
            <tr className="Table-container__headRow">
              <th className={sortField === 'id' ? 'sortDirection' + sortDirection : null}
                onClick={() => {this.sortTableColumn('id')}}>id</th>
              <th className={sortField === 'firstName' ? 'sortDirection' + sortDirection : null}
                onClick={() => {this.sortTableColumn('firstName')}}>firstName</th>
              <th className={sortField === 'lastName' ? 'sortDirection' + sortDirection : null}
                onClick={() => {this.sortTableColumn('lastName')}}>lastName</th>
              <th className={sortField === 'email' ? 'sortDirection' + sortDirection : null}
                onClick={() => {this.sortTableColumn('email')}}>email</th>
              <th className={sortField === 'phone' ? 'sortDirection' + sortDirection : null}
                onClick={() => {this.sortTableColumn('phone')}}>phone</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.slice(offset, offset + totalElementsOnPage).map(userData => (
              <tr className='Table-container__row' key={userData.id + userData.phone} onClick={() => {this.showUserProfile(userData)}}>
                <td>{userData.id}</td>
                <td>{userData.firstName}</td>
                <td>{userData.lastName}</td>
                <td>{userData.email}</td>
                <td>{userData.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          activePage={this.state.page}
          itemsCountPerPage={totalElementsOnPage}
          totalItemsCount={filteredData.length}
          onChange={this.changePage}
        />
        {userProfile && <UserProfile userData={userProfile}/>}
      </div>
    );
  }
}

export default Table;
