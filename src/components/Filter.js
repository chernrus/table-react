import React, { Component } from 'react';

class Filter extends Component {
  constructor() {
    super();

    this.state = {
      value: ''
    };

    this.changeValue = this.changeValue.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
  }

  changeValue({ target: { value } }) {
    this.setState({
      value
    });
  }

  buttonClick() {
    const { onFilterChange } = this.props;
    const { value } = this.state;

    onFilterChange(value);
  }

  render() {
    const { value } = this.state;
    return (
      <div className="Filter-panel">
        <span>Фильтр</span>
        <input
          type="text"
          value={value}
          onChange={this.changeValue}
          placeholder="Введите подстроку"
        />
        <button onClick={this.buttonClick}>Найти</button>
      </div>
    )
  }
}

export default Filter;
