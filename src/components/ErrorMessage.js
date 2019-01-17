import React,  { Component } from 'react';

class ErrorMessage extends Component {

  render() {
    const { error } = this.props;
    console.log(this.props);
    return(
      <div className='Error-message'>
        <p>{error}</p>
      </div>
    )
  }
}

export default ErrorMessage;
