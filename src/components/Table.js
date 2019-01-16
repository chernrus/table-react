import React,  { Component } from 'react';

class Table extends Component {

  sortTableColumn = (column) => {
    console.log(column);
  }

  render() {
    return (
      <div className="Table-containe">
        <table>
          <thead>
            <tr>
              <th onClick={() => {this.sortTableColumn('id')}}>id</th>
              <th onClick={() => {this.sortTableColumn('firstName')}}>firstName</th>
              <th onClick={() => {this.sortTableColumn('lastName')}}>lastName</th>
              <th onClick={() => {this.sortTableColumn('email')}}>email</th>
              <th onClick={() => {this.sortTableColumn('phone')}}>phone</th>
            </tr>
          </thead>
          <tbody>
          {this.props.data.map(userData => (
            <tr onClick={() => {this.showUserProfile(userData)}}>
              <td>{userData.id}</td>
              <td>{userData.firstName}</td>
              <td>{userData.lastName}</td>
              <td>{userData.email}</td>
              <td>{userData.phone}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    );

  }
}

export default Table;
