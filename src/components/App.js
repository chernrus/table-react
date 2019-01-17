import React, { Component } from 'react';
import '../App.css';
import Spinner from './Spinner';
import Table from './Table';

class App extends Component {
  state = {
    data: [],
    error: null,
    isLoading: false,
    userProfile: null
  }

  loadData = (type) => {

    this.setState({ isLoading: true, data: []})

    const smallDataUrl = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',
      bigDataUrl = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';

    let url = '';

    if(type === 'small-data-value') {
      url = smallDataUrl
    }
    if(type === 'big-data-value') {
      url = bigDataUrl
    }

    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => this.setState({
        data: data,
        error: null,
        isLoading: false
      }))
      .catch(error => this.setState({
        data: [],
        error: error.message,
        isLoading: false
      }));
  }

  showUserProfile = (userData) => {
    this.setState({userProfile: userData})
  }

  render() {
    const {
      data,
      isLoading,
      error
    } = this.state
    console.log(error);
    console.log(data);
    return (
      <div className="App">
        {isLoading && <Spinner />}
        <div className="Load-data-panel">
          <span>Выбор объема данных</span>
          <button className="Load-data-panel__button small-data-btn" onClick={() => {this.loadData('small-data-value')}}>Малый объем данных</button>
          <button className="Load-data-panel__button big-data-btn" onClick={() => {this.loadData('big-data-value')}}>Большой объем данных</button>
        </div>
        {data.length !== 0 && <Table data={data}/>}
      </div>
    );
  }
}

export default App;
