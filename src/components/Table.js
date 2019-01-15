import React, {Component} from 'react';

const Table = (props) => {
  // data = [data[0]];
  console.log(props);


    return (
      <div className="Table-containe">
        <table>
          <thead>
            <tr>
              <th >id</th>
              <th >firstName</th>
              <th >lastName</th>
              <th >email</th>
              <th >phone</th>
            </tr>
          </thead>
          <tbody>
          {props.data.map(userData => (
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

export default Table;
