import React,  { Component } from 'react';

class ErrorMessage extends Component {

  render() {
    const { error } = this.props;

    return(
      <div className='Error-message'>
        <p>Ошибка: {error}</p>
      </div>
    )
  }
}

export default ErrorMessage;
